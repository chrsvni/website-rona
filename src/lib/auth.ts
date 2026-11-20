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
}

export const SESSION_COOKIE_NAME = 'rona_session'

export async function getServerSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
    if (!sessionCookie?.value) return null

    const parsed = JSON.parse(
      decodeURIComponent(sessionCookie.value)
    ) as UserSession
    if (!parsed || !parsed.id || !parsed.role) return null
    return parsed
  } catch {
    return null
  }
}

export function parseSessionFromCookieValue(
  value?: string
): UserSession | null {
  if (!value) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as UserSession
    if (!parsed || !parsed.id || !parsed.role) return null
    return parsed
  } catch {
    return null
  }
}
