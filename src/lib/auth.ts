import { cookies } from 'next/headers'

export interface UserSession {
  id: string
  name: string
  email: string
  role: 'GURU' | 'ADMIN'
  schoolName?: string | null
  nip?: string | null
  homeroomClass?: string | null
  avatarUrl?: string | null
  exp?: number
}

export const SESSION_COOKIE_NAME = 'rona_session'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 hari (dalam detik)

const DEFAULT_SECRET = 'rona_skripsi_cika_fallback_secret_key_847192837491823'

function getSecretKey(): string {
  return process.env.AUTH_SECRET || DEFAULT_SECRET
}

// Helper: Base64URL encode
function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

// Helper: Base64URL decode
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) {
    base64 += '='
  }
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new TextDecoder().decode(bytes)
}

// HMAC-SHA256 Sign menggunakan Web Crypto API (didukung di Node.js & Edge Runtime)
async function signMessage(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(message))
  const hashArray = Array.from(new Uint8Array(signature))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Membuat token sesi terenkripsi / tertanda tangan digital (HMAC-SHA256).
 */
export async function createSessionToken(user: UserSession): Promise<string> {
  const payload: UserSession = {
    ...user,
    exp: Date.now() + SESSION_MAX_AGE * 1000,
  }
  const serialized = JSON.stringify(payload)
  const encodedPayload = base64UrlEncode(serialized)
  const signature = await signMessage(encodedPayload, getSecretKey())
  return `${encodedPayload}.${signature}`
}

/**
 * Memverifikasi keaslian dan integritas token sesi.
 * Menolak token yang dipalsukan, dimanipulasi, atau sudah kadaluwarsa.
 */
export async function verifySessionToken(token: string): Promise<UserSession | null> {
  if (!token || typeof token !== 'string') return null
  const parts = token.split('.')
  if (parts.length !== 2) return null

  const [encodedPayload, signature] = parts
  const expectedSignature = await signMessage(encodedPayload, getSecretKey())

  if (signature.length !== expectedSignature.length) return null

  // Timing-safe comparison untuk mencegah timing attack
  let match = 0
  for (let i = 0; i < signature.length; i++) {
    match |= signature.charCodeAt(i) ^ expectedSignature.charCodeAt(i)
  }
  if (match !== 0) return null

  try {
    const jsonStr = base64UrlDecode(encodedPayload)
    const session = JSON.parse(jsonStr) as UserSession
    if (!session || !session.id || !session.role) return null
    if (session.exp && Date.now() > session.exp) return null
    return session
  } catch {
    return null
  }
}

/**
 * Mengambil sesi pengguna yang terverifikasi dari Server Component / Server Action / Route Handler.
 */
export async function getServerSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
    if (!sessionCookie?.value) return null
    return await verifySessionToken(sessionCookie.value)
  } catch {
    return null
  }
}

/**
 * Parsing dan verifikasi sesi dari nilai cookie langsung.
 */
export async function parseSessionFromCookieValue(
  value?: string
): Promise<UserSession | null> {
  if (!value) return null
  return await verifySessionToken(value)
}
