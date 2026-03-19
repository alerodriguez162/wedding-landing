export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="section-padding border-t border-sand-200 bg-sand-100/50">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-serif text-lg text-stone-700">Dulce Fabiola & José Eduardo · Julieta</p>
        <p className="mt-1 text-sm text-stone-500">{year} · Beach Club · 25 de abril</p>
        <p className="mt-4 text-xs text-stone-400">Hecho con cariño para nuestro evento</p>
      </div>
    </footer>
  )
}
