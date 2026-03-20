'use client'

import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { CONTACTS } from '@/lib/constants'

function formatWhatsApp(phone: string) {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/52${digits}`
}

function copyNumber(phone: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(phone)
  }
}

export function Contact() {
  const handleCopyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const phone = e.currentTarget.dataset.phone
    if (phone) copyNumber(phone)
  }

  return (
    <Section id="contact" subtitle="Estamos para ayudarte" title="Dudas y contacto">
      <Card>
        <p className="copy-justify mb-8 leading-relaxed text-stone-600 sm:text-center">
          Si tienes alguna duda, contáctanos por WhatsApp o llámanos.
        </p>
        <ul className="space-y-4">
          {CONTACTS.filter((c) => c.phone).map((contact) => (
            <li
              className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-2 gap-y-0 rounded-xl border border-sand-200 bg-sand-50/50 p-3 sm:gap-x-3 sm:p-4"
              key={contact.name}
            >
              <span className="min-w-0 truncate font-semibold text-stone-800">{contact.name}</span>
              <button
                className="btn-secondary shrink-0 whitespace-nowrap px-2 py-2 text-xs sm:px-4 sm:text-sm"
                data-phone={contact.phone}
                type="button"
                onClick={handleCopyClick}
              >
                Copiar número
              </button>
              <a
                className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-[#25D366] px-2 py-2 text-xs font-medium text-white hover:bg-[#20bd5a] sm:px-4 sm:text-sm"
                href={formatWhatsApp(contact.phone)}
                rel="noopener noreferrer"
                target="_blank"
              >
                WhatsApp
              </a>
            </li>
          ))}
        </ul>
        {CONTACTS.some((c) => !c.phone) && (
          <p className="mt-4 text-center text-sm text-stone-500">
            Eduardo: número pendiente de confirmar.
          </p>
        )}
      </Card>
    </Section>
  )
}
