import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import {
  HasilTopBar,
  HasilKopSurat,
  HasilIdentitas,
  HasilTugasBukti,
  HasilSkorRingkasan,
  HasilRekomendasiRencana,
  HasilPengesahan,
} from './_components'

export default async function ScreeningResultCardPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params

  const screening = await prisma.screening.findUnique({
    where: { id },
    include: {
      student: true,
      teacher: true,
    },
  })

  if (!screening) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-6">
      <HasilTopBar studentId={screening.studentId} />

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#BDD8E9] shadow-xl text-[#001D39] space-y-8 print:border-none print:shadow-none print:p-0">
        <HasilKopSurat screening={screening} />
        <HasilIdentitas screening={screening} />
        <HasilTugasBukti screening={screening} />
        <HasilSkorRingkasan screening={screening} />
        <HasilRekomendasiRencana screening={screening} />
        <HasilPengesahan screening={screening} />
      </div>
    </div>
  )
}
