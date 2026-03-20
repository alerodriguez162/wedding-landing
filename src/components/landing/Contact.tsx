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
        <p className="mb-8 text-center leading-relaxed text-stone-600">
          Si tienes alguna duda, contáctanos por WhatsApp o llámanos.
        </p>
        <ul className="space-y-4">
          {CONTACTS.filter((c) => c.phone).map((contact) => (
            <li
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-sand-200 bg-sand-50/50 p-4"
              key={contact.name}
            >
              <span className="font-semibold text-stone-800">{contact.name}</span>
              <div className="flex items-center gap-2">
                <button
                  className="btn-secondary text-sm py-2 px-4"
                  data-phone={contact.phone}
                  type="button"
                  onClick={handleCopyClick}
                >
                  Copiar número
                </button>
                <a
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 text-sm font-medium text-white hover:bg-[#20bd5a]"
                  href={formatWhatsApp(contact.phone)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  WhatsApp
                </a>
              </div>
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
