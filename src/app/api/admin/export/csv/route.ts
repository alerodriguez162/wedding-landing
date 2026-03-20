import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth-admin'
import { prisma } from '@/lib/prisma'

function escapeCsv(s: string): string {
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

export async function GET(req: Request) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
  }
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') || 'all'

  try {
    const rows: string[] = []
    if (type === 'meals' || type === 'all') {
      const meals = await prisma.mealSelection.findMany({ orderBy: { createdAt: 'desc' } })
      rows.push('Selecciones de platillo')
      rows.push('Remitente,Asistente,Voto (plato),Notas,Fecha')
      for (const m of meals) {
        rows.push(
          [
            escapeCsv(m.senderName),
            escapeCsv(m.attendeeName || ''),
            escapeCsv(m.adultMainDish),
            escapeCsv(m.notes || ''),
            m.createdAt.toISOString(),
          ].join(','),
        )
      }
      rows.push('')
    }
    if (type === 'lodging' || type === 'all') {
      const lodging = await prisma.lodgingRequest.findMany({ orderBy: { createdAt: 'desc' } })
      rows.push('Solicitudes de hospedaje')
      rows.push(
        'Nombre,Personas,Adultos,Niños,Llegada,Salida,Compartir,Habitaciones,Detalle habitaciones,Noches,Total,Estado pago,Fecha',
      )
      for (const r of lodging) {
        rows.push(
          [
            escapeCsv(r.name),
            r.numberOfPeople,
            r.adults,
            r.children,
            r.arrivalDate.toISOString().slice(0, 10),
            r.departureDate.toISOString().slice(0, 10),
            r.willingToShare ? 'Sí' : 'No',
            r.roomsNeeded ?? '',
            escapeCsv(r.roomBreakdown || ''),
            r.nights ?? '',
            r.estimatedTotal?.toString() ?? '',
            escapeCsv(r.paymentStatus),
            r.createdAt.toISOString(),
          ].join(','),
        )
      }
      rows.push('')
    }
    if (type === 'makeup' || type === 'all') {
      const makeup = await prisma.makeupHairRequest.findMany({ orderBy: { createdAt: 'desc' } })
      rows.push('Maquillaje y peinado')
      rows.push('Nombre,Personas,Servicio,Fecha')
      for (const m of makeup) {
        rows.push(
          [
            escapeCsv(m.name),
            m.peopleCount,
            escapeCsv(m.serviceType),
            m.createdAt.toISOString(),
          ].join(','),
        )
      }
    }

    const csv = rows.join('\n')
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="export-${type}-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Error al exportar' }, { status: 500 })
  }
}
