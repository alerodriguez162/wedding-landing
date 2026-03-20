import { ROOM_PHOTOS_FACEBOOK_POST_URLS } from '@/lib/constants'

export function RoomPhotosLinks() {
  const urls = ROOM_PHOTOS_FACEBOOK_POST_URLS

  if (urls.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-sand-300 bg-sand-50/80 px-4 py-6 text-center text-sm text-stone-600">
        <p className="font-medium text-stone-700">Fotos de habitaciones</p>
        <p className="mt-2 text-xs text-stone-500">
          Configura <code className="rounded bg-sand-200 px-1 py-0.5 text-[0.75rem]">NEXT_PUBLIC_ROOM_PHOTOS_FACEBOOK_POST_URLS</code> (enlaces a publicaciones de Facebook, separados por coma).
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-3 text-sm font-medium text-stone-700">Fotos de las habitaciones</p>
      <p className="mb-4 text-xs text-stone-500">
        Abre cada publicación en Facebook para ver las fotos (sin vista embebida en esta página).
      </p>
      <ul className="space-y-2">
        {urls.map((href, i) => (
          <li key={`${href}-${i}`}>
            <a
              className="inline-flex items-center gap-2 text-sm font-medium text-gold-600 underline decoration-gold-400/80 underline-offset-2 hover:text-gold-700"
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              Ver publicación {i + 1}
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
