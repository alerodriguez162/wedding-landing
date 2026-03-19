import { z } from 'zod'

export const makeupSchema = z.object({
  name: z.string().min(2, 'Nombre requerido').max(100),
  peopleCount: z.coerce.number().min(1, 'Mínimo 1 persona').max(20),
  serviceType: z.enum(['peinado', 'maquillaje', 'ambos'], {
    required_error: 'Elige al menos una opción',
  }),
})

export type MakeupInput = z.infer<typeof makeupSchema>
