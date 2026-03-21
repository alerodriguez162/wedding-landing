/**
 * Configuración pública del sitio. Prioridad: variables `NEXT_PUBLIC_*` en `.env` → valores por defecto abajo.
 * Copia `.env.example` a `.env` y ajusta sin tocar código.
 */

export type SiteContact = { name: string; phone: string }

/** Valores por defecto (mismo evento) si falta una variable en `.env`. */
const SITE_DEFAULTS = {
  eventDateIso: '2026-04-25',
  eventDateDisplayEs: '25 de abril de 2026',
  eventName: 'Boda y Bautismo',
  venueName: 'Beach Club',
  venueFbLink: 'https://www.facebook.com/profile.php?id=100067222092732&locale=es_LA',
  whatsappGroupLink: 'https://chat.whatsapp.com/DKqJHVJHMOBKCnl2K0tBED',
  roomFbPostUrls: [
    'https://www.facebook.com/permalink.php?story_fbid=pfbid0RgVnwFT5XBgQhFHztRWSaT9BFQFHhRzMSD3H77JCncSbWh5GwH4AT61vnpMK5jydl&id=100067222092732',
    'https://www.facebook.com/permalink.php?story_fbid=pfbid0fdCU3EuHwPRTxJ6PizkzjSoP2k2bCzwsFrJ63vTs3rGGeaveXufhYBawVoRys9Bnl&id=100067222092732',
    'https://www.facebook.com/permalink.php?story_fbid=pfbid02v4QFiSAKYrT6ULd69jD8fYeKCg2zRN9jzXL5YveGR9VtxWZcyhZdEfXNLvT59vGul&id=100067222092732',
  ],
  giftRegistryWedding:
    'https://mesaderegalos.liverpool.com.mx/gestiondeeventos/listaderegalos/51973467',
  giftRegistryBaptism:
    'https://mesaderegalos.liverpool.com.mx/gestiondeeventos/listaderegalos/51973470',
  pinterestBoard: 'https://www.pinterest.com/hoshi_hikari13/inspobodaplaya/',
  pinterestShare: 'https://pin.it/9P7cj0A70',
  makeupHairPrice: 1800,
  makeupHairLink:
    'https://www.facebook.com/profile.php?id=61566030973465&mibextid=wwXIfr&rdid=C4xNGED3wtbfJpKv&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AidQ3p4yb%2F%3Fmibextid%3DwwXIfr',
  contacts: [
    { name: 'Kari', phone: '5532276938' },
    { name: 'Eduardo', phone: '9581180176' },
    { name: 'Fabi', phone: '5528584046' },
  ] satisfies SiteContact[],
  paymentInstructions: `
Para apartar tu habitación, realiza una transferencia a la cuenta que se te indicará por mensaje.
Una vez confirmado el pago, tu reservación quedará confirmada.
Si tienes dudas, contáctanos por WhatsApp.
`.trim(),
  siteTitle: 'Dulce Fabiola & José Eduardo | Boda y Bautismo',
  siteDescription:
    'Celebra con nosotros el 25 de abril de 2026 en Beach Club. Boda de Dulce Fabiola Rodríguez Miranda y José Eduardo José, y bautismo de Julieta José Rodríguez.',
  siteOgDescription: '25 de abril de 2026 · Beach Club',
  /** Álbum compartido (Google Fotos). */
  photosAlbumUrl:
    'https://photos.google.com/share/AF1QipNOt-sRlXxTCkqGIXa-VCkh2XzbKY9zGLJzHZg36WyeiL0Ght0HOP2Z4xY4t5DPDg?key=M3lMcER3Z0c0MzNONW5nYWJRYmZTX3Uxc09ZRDhB',
} as const

function env(key: string): string | undefined {
  const v = process.env[key]?.trim()
  return v || undefined
}

function parseContactsJson(raw: string): SiteContact[] | null {
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return null
    }
    const out: SiteContact[] = []
    for (const item of parsed) {
      if (
        item &&
        typeof item === 'object' &&
        'name' in item &&
        'phone' in item &&
        typeof (item as SiteContact).name === 'string' &&
        typeof (item as SiteContact).phone === 'string'
      ) {
        out.push({ name: (item as SiteContact).name, phone: (item as SiteContact).phone })
      } else {
        return null
      }
    }
    return out
  } catch {
    return null
  }
}

// --- Fecha y evento ---

const eventDateIso = env('NEXT_PUBLIC_EVENT_DATE_ISO') ?? SITE_DEFAULTS.eventDateIso
export const EVENT_DATE = new Date(eventDateIso)

export const EVENT_DATE_DISPLAY_ES =
  env('NEXT_PUBLIC_EVENT_DATE_DISPLAY_ES') ?? SITE_DEFAULTS.eventDateDisplayEs

export const EVENT_NAME = env('NEXT_PUBLIC_EVENT_NAME') ?? SITE_DEFAULTS.eventName

export const VENUE_NAME = env('NEXT_PUBLIC_VENUE_NAME') ?? SITE_DEFAULTS.venueName

export const VENUE_FB_LINK = env('NEXT_PUBLIC_VENUE_FB_LINK') ?? SITE_DEFAULTS.venueFbLink

/** Web, Instagram u otro enlace del venue. Si vacío, se usa VENUE_FB_LINK. */
export const VENUE_PUBLIC_LINK = env('NEXT_PUBLIC_VENUE_PUBLIC_LINK') || VENUE_FB_LINK

export const WHATSAPP_GROUP_LINK =
  env('NEXT_PUBLIC_WHATSAPP_GROUP_LINK') ?? SITE_DEFAULTS.whatsappGroupLink

const roomFbPostsEnv = env('NEXT_PUBLIC_ROOM_PHOTOS_FACEBOOK_POST_URLS') ?? ''

export const ROOM_PHOTOS_FACEBOOK_POST_URLS: string[] = roomFbPostsEnv
  ? roomFbPostsEnv
      .split(',')
      .map((u) => u.trim())
      .filter(Boolean)
  : [...SITE_DEFAULTS.roomFbPostUrls]

export const GIFT_REGISTRY_WEDDING_URL =
  env('NEXT_PUBLIC_GIFT_REGISTRY_WEDDING_URL') ?? SITE_DEFAULTS.giftRegistryWedding

export const GIFT_REGISTRY_BAPTISM_URL =
  env('NEXT_PUBLIC_GIFT_REGISTRY_BAPTISM_URL') ?? SITE_DEFAULTS.giftRegistryBaptism

export const PINTEREST_BOARD_URL =
  env('NEXT_PUBLIC_PINTEREST_BOARD_URL') ?? SITE_DEFAULTS.pinterestBoard

export const PINTEREST_SHARE_URL =
  env('NEXT_PUBLIC_PINTEREST_SHARE_URL') ?? SITE_DEFAULTS.pinterestShare

const makeupPriceRaw = env('NEXT_PUBLIC_MAKEUP_HAIR_PRICE')
const makeupParsed = makeupPriceRaw ? Number.parseInt(makeupPriceRaw, 10) : NaN
export const MAKEUP_HAIR_PRICE = Number.isFinite(makeupParsed) ? makeupParsed : SITE_DEFAULTS.makeupHairPrice

export const MAKEUP_HAIR_LINK =
  env('NEXT_PUBLIC_MAKEUP_HAIR_LINK') ?? SITE_DEFAULTS.makeupHairLink

const contactsFromEnv = env('NEXT_PUBLIC_CONTACTS_JSON')
export const CONTACTS: readonly SiteContact[] = contactsFromEnv
  ? parseContactsJson(contactsFromEnv) ?? SITE_DEFAULTS.contacts
  : SITE_DEFAULTS.contacts

const paymentFromEnv = env('NEXT_PUBLIC_PAYMENT_INSTRUCTIONS')
export const PAYMENT_INSTRUCTIONS = paymentFromEnv
  ? paymentFromEnv.replace(/\\n/g, '\n').trim()
  : SITE_DEFAULTS.paymentInstructions

/** `<title>` y metadatos Open Graph (también en `layout.tsx`). */
export const SITE_METADATA_TITLE = env('NEXT_PUBLIC_SITE_TITLE') ?? SITE_DEFAULTS.siteTitle

export const SITE_METADATA_DESCRIPTION =
  env('NEXT_PUBLIC_SITE_DESCRIPTION') ?? SITE_DEFAULTS.siteDescription

export const SITE_OG_DESCRIPTION =
  env('NEXT_PUBLIC_SITE_OG_DESCRIPTION') ?? SITE_DEFAULTS.siteOgDescription

/** Álbum de fotos del evento (Google Fotos u otro). Sobrescribe con NEXT_PUBLIC_PHOTOS_ALBUM_URL. */
export const PHOTOS_ALBUM_URL =
  env('NEXT_PUBLIC_PHOTOS_ALBUM_URL') ?? SITE_DEFAULTS.photosAlbumUrl
