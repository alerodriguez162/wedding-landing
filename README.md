# Landing Boda y Bautizo

Sitio informativo y organizativo para el evento de boda de **Dulce Fabiola Rodríguez Miranda** y **José Eduardo José**, y bautizo de **Julieta José Rodríguez**. Fecha: **25 de abril de 2026** en **Beach Club**.

## Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, React Hook Form, Zod, Framer Motion
- **Backend:** Next.js API Routes, Prisma, PostgreSQL

## Requisitos

- Node.js 18+
- PostgreSQL (local, Neon, Supabase o Railway)

## Instalación

```bash
# Clonar e instalar dependencias
git clone <repo>
cd wedding-landing
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu DATABASE_URL y ADMIN_PASSWORD

# Crear tablas y datos iniciales
npx prisma db push
npx prisma db seed

# Desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El panel de administración está en [http://localhost:3000/admin](http://localhost:3000/admin).

## Variables de entorno

| Variable                          | Descripción                                      |
| --------------------------------- | ------------------------------------------------ |
| `DATABASE_URL`                    | URL de conexión PostgreSQL                       |
| `ADMIN_PASSWORD`                  | Contraseña del panel admin                       |
| `NEXT_PUBLIC_WHATSAPP_GROUP_LINK` | (Opcional) Enlace del grupo de WhatsApp          |
| `NEXT_PUBLIC_SITE_URL`            | (Opcional) URL pública del sitio para enlaces/QR |

## Despliegue en Vercel

El proyecto incluye `vercel.json` con el comando de build ya configurado (`prisma generate && next build`).

1. **Conecta el repo:** [vercel.com](https://vercel.com) → Import Git Repository → elige este repo.
2. **Variables de entorno** (Settings → Environment Variables). Añade al menos:
   - `DATABASE_URL` — PostgreSQL (ej. [Neon](https://neon.tech) o [Supabase](https://supabase.com), plan gratis).
   - `ADMIN_JWT_SECRET` — mínimo 32 caracteres, aleatorio (para el login del panel).
   - `ADMIN_PASSWORD` — contraseña del panel admin.
   - `SITE_PASSWORD` — (opcional) si la defines, toda la web pide esta contraseña antes de entrar (sitio privado para invitados).
3. **Build:** no cambies nada; Vercel usa el `buildCommand` de `vercel.json`.
4. **Despliega.** Tras el primer deploy, en tu máquina (con la misma `DATABASE_URL`) ejecuta:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
5. Opcionales: `NEXT_PUBLIC_SITE_URL` (URL final del sitio), `NEXT_PUBLIC_WHATSAPP_GROUP_LINK`, `NEXT_PUBLIC_ROOM_PHOTOS_FACEBOOK_POST_URLS`.

## Estructura del proyecto

```
src/
  app/
    api/           # API routes (meals, lodging, rooms, transport, makeup, photos, admin)
    admin/         # Vista administrativa protegida
    layout.tsx
    page.tsx       # Landing principal
  components/
    layout/        # Nav, Footer
    ui/            # Section, Card
    landing/       # Hero, Welcome, Flights, Contact, etc.
  features/
    meals/         # Formulario y schema de platillos
    lodging/       # Formulario y schema de hospedaje
    makeup/        # Formulario y schema maquillaje/peinado
    photos/        # Sección álbum y subida
  lib/
    prisma.ts
    constants.ts
    auth-admin.ts
    menu-options.ts
prisma/
  schema.prisma
  seed.ts
```

## Funcionalidades

- **Landing:** Hero con countdown, bienvenida, programa (próximamente), mesa de regalos, dress code, votación de platillos, vuelos, hospedaje (personas y habitaciones), traslados, maquillaje/peinado, álbum de fotos, contacto, CTA WhatsApp.
- **Hospedaje:** Solicitud con personas, número de habitaciones y detalle opcional; opción compartir; instrucciones de pago; listado en admin.
- **Admin:** Login por contraseña, listados de platillos, hospedaje, habitaciones (editar disponibilidad/activo), maquillaje, fotos; actualizar estado de pago; exportar CSV.

## Mejoras futuras sugeridas

- Mover opciones de menú a BD o CMS para editarlas sin tocar código.
- Integración PayPal para apartado de habitaciones (estructura ya preparada con `paymentStatus`).
- Subida de imágenes del menú en elección de platillo (guardar URLs en `imageUrls`).
- Álbum: generación de QR que apunte a `/fotos` o a un formulario de subida.
- Supabase Storage para fotos en producción en lugar de `public/uploads`.
- Autenticación admin más robusta (NextAuth o Supabase Auth) si se requiere.
- Más hoteles: añadir modelo `Hotel` y relación `LodgingRequest` → `Hotel`; pantalla de selección de hotel antes de habitaciones.

## Licencia

Uso privado para el evento.
