export const EVENT_DATE = new Date('2026-04-25')
export const EVENT_NAME = 'Boda y Bautizo'
export const VENUE_NAME = 'Beach Club'
export const VENUE_FB_LINK = 'https://www.facebook.com/profile.php?id=100067222092732&locale=es_LA'

/** URLs de posts de Facebook con fotos de las habitaciones (embed, no se descargan). Sobrescribe con NEXT_PUBLIC_ROOM_PHOTOS_FACEBOOK_POST_URLS (urls separadas por coma) si quieres otros. */
const DEFAULT_ROOM_PHOTOS_POSTS = [
  'https://www.facebook.com/permalink.php?story_fbid=pfbid0RgVnwFT5XBgQhFHztRWSaT9BFQFHhRzMSD3H77JCncSbWh5GwH4AT61vnpMK5jydl&id=100067222092732',
  'https://www.facebook.com/permalink.php?story_fbid=pfbid0fdCU3EuHwPRTxJ6PizkzjSoP2k2bCzwsFrJ63vTs3rGGeaveXufhYBawVoRys9Bnl&id=100067222092732',
  'https://www.facebook.com/permalink.php?story_fbid=pfbid02v4QFiSAKYrT6ULd69jD8fYeKCg2zRN9jzXL5YveGR9VtxWZcyhZdEfXNLvT59vGul&id=100067222092732',
]
const roomPhotosEnv = process.env.NEXT_PUBLIC_ROOM_PHOTOS_FACEBOOK_POST_URLS ?? ''
export const ROOM_PHOTOS_FACEBOOK_POST_URLS: string[] = roomPhotosEnv
  ? roomPhotosEnv
      .split(',')
      .map((u) => u.trim())
      .filter(Boolean)
  : DEFAULT_ROOM_PHOTOS_POSTS

/** Mesa de regalos: enlace externo (Liverpool, Amazon, etc.). Vacío = mensaje “te pasamos el link”. */
export const GIFT_REGISTRY_LINK = process.env.NEXT_PUBLIC_GIFT_REGISTRY_LINK ?? ''

export const MAKEUP_HAIR_PRICE = 1800
export const MAKEUP_HAIR_LINK =
  'https://www.facebook.com/profile.php?id=61566030973465&mibextid=wwXIfr&rdid=C4xNGED3wtbfJpKv&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AidQ3p4yb%2F%3Fmibextid%3DwwXIfr'

export const CONTACTS = [
  { name: 'Kari', phone: '5532276938' },
  { name: 'Eduardo', phone: '' },
  { name: 'Fabi', phone: '5528584046' },
] as const

export const PAYMENT_INSTRUCTIONS = `
Para apartar tu habitación, realiza una transferencia a la cuenta que se te indicará por mensaje.
Una vez confirmado el pago, tu reservación quedará confirmada.
Si tienes dudas, contáctanos por WhatsApp.
`.trim()
