import { z } from 'zod'
import { ADULT_MAIN_DISHES, KIDS_MAIN_DISHES } from '@/lib/menu-options'

const adultIds = ADULT_MAIN_DISHES.map((d) => d.id)
const kidsIds = KIDS_MAIN_DISHES.map((d) => d.id)

export const mealSelectionSchema = z.object({
  senderName: z.string().min(2, 'Escribe tu nombre').max(100),
  attendeeName: z.string().max(100).optional(),
  adultMainDish: z.enum(adultIds as [string, ...string[]], {
    required_error: 'Elige un plato fuerte',
  }),
  kidsMainDish: z.enum(kidsIds as [string, ...string[]]).optional(),
  notes: z.string().max(500).optional(),
})

export type MealSelectionInput = z.infer<typeof mealSelectionSchema>
