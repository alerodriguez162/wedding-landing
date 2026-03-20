/** Etiquetas en español para valores guardados en BD (formulario maquillaje). */
export const MAKEUP_SERVICE_LABELS: Record<string, string> = {
  peinado: 'Peinado',
  maquillaje: 'Maquillaje',
  ambos: 'Peinado y maquillaje',
}

export function getMakeupServiceLabel(serviceType: string): string {
  return MAKEUP_SERVICE_LABELS[serviceType] ?? serviceType
}
