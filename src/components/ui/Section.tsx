'use client'

import { motion } from 'framer-motion'

type SectionProps = {
  id: string
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export function Section({ id, title, subtitle, children, className = '' }: SectionProps) {
  return (
    <section className={`section-padding ${className}`} id={id}>
      <div className="mx-auto max-w-3xl">
        {(title || subtitle) && (
          <motion.header
            className="mb-8 text-center sm:mb-10"
            initial={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, margin: '-50px' }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {title && (
              <h2 className="font-serif text-3xl font-semibold text-stone-800 sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 max-w-2xl mx-auto font-sans text-lg leading-relaxed text-stone-600">
                {subtitle}
              </p>
            )}
          </motion.header>
        )}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true, margin: '-30px' }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}
