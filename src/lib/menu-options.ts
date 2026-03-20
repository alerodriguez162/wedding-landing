/**
 * Opciones del menú. Se pueden mover a BD o CMS más adelante.
 * Acompañamiento: puré de zanahoria con cuatro quesos y ensalada fresca.
 */
const ACCOMPANIMENT = 'Acompañado de puré de zanahoria con cuatro quesos y ensalada fresca'

export const ADULT_MAIN_DISHES = [
  { id: 'camarones-gratinados', label: 'Camarones gratinados', accompaniment: ACCOMPANIMENT },
  {
    id: 'camarones-salsa-mango-pina',
    label: 'Camarones en salsa de mango con piña',
    accompaniment: ACCOMPANIMENT,
  },
  { id: 'camarones-el-general', label: 'Camarones el general', accompaniment: ACCOMPANIMENT },
  {
    id: 'filete-relleno-mariscos',
    label: 'Filete relleno de mariscos',
    accompaniment: ACCOMPANIMENT,
  },
  {
    id: 'filete-relleno-carnes-frias',
    label: 'Filete relleno de carnes frías',
    accompaniment: ACCOMPANIMENT,
  },
  { id: 'filete-el-general', label: 'Filete el general', accompaniment: ACCOMPANIMENT },
] as const

export const KIDS_MAIN_DISHES = ADULT_MAIN_DISHES

export type AdultDishId = (typeof ADULT_MAIN_DISHES)[number]['id']
export type KidsDishId = (typeof KIDS_MAIN_DISHES)[number]['id']

/** Etiqueta legible para admin / CSV (el id se guarda en BD). */
export function getAdultDishLabel(id: string): string {
  const found = ADULT_MAIN_DISHES.find((d) => d.id === id)
  return found?.label ?? id
}
