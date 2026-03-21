import { z } from 'zod'

function roomsNeededFromForm(val: unknown): number | undefined {
  if (val === '' || val === null || val === undefined) return undefined
  if (typeof val === 'number' && Number.isNaN(val)) return undefined
  const n = typeof val === 'number' ? val : Number(val)
  if (Number.isNaN(n)) return undefined
  return n
}

export const lodgingSchema = z
  .object({
    name: z.string().min(2, 'Nombre requerido').max(100),
    adults: z.coerce.number().min(0, 'Mínimo 0').max(20),
    children: z.coerce.number().min(0, 'Mínimo 0').max(20),
    roomsNeeded: z.preprocess(roomsNeededFromForm, z.number().min(1).max(50).optional()),
    roomBreakdown: z.string().max(2000).optional(),
    arrivalDate: z.string().min(1, 'Indica día de llegada'),
    departureDate: z.string().min(1, 'Indica día de salida'),
    willingToShare: z.boolean().optional(),
    notes: z.string().max(500).optional(),
  })
  .refine((data) => data.adults + data.children >= 1, {
    message: 'Indica al menos 1 persona (adultos o niños)',
    path: ['adults'],
  })
  .refine(
    (data) => {
      if (data.willingToShare === true) return true
      return data.roomsNeeded !== undefined && data.roomsNeeded >= 1
    },
    { message: 'Indica cuántas habitaciones necesitas', path: ['roomsNeeded'] },
  )
  .refine(
    (data) => {
      if (!data.arrivalDate || !data.departureDate) return true
      return new Date(data.departureDate) >= new Date(data.arrivalDate)
    },
    { message: 'La salida debe ser después de la llegada', path: ['departureDate'] },
  )

export type LodgingInput = z.infer<typeof lodgingSchema>
