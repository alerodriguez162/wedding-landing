# Landing Boda y Bautismo

Sitio informativo y organizativo para el evento de boda de **Dulce Fabiola Rodríguez Miranda** y **José Eduardo José**, y bautismo de **Julieta José Rodríguez**. Fecha: **25 de abril de 2026** en **Beach Club**.

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

### Sitio privado (solo invitados)

1. En `.env`, define **`SITE_PASSWORD`** con la contraseña que compartirás por WhatsApp u otro canal (por ejemplo `SITE_PASSWORD="MiClave2026"`).
2. Define también **`NEXT_PUBLIC_SITE_PROTECTED="true"`**. El middleware corre en Edge Runtime, donde las variables sin `NEXT_PUBLIC_` no están disponibles; este flag activa la puerta (no expone la contraseña).
3. Asegúrate de tener **`ADMIN_JWT_SECRET`** con al menos 32 caracteres (ya lo usas para el panel admin).
4. Reinicia `npm run dev` o el despliegue. Cualquier visita a la web irá a **`/acceso`** hasta introducir la contraseña; se guarda una cookie segura por un año.
5. Si **no** defines ambos (`SITE_PASSWORD` y `NEXT_PUBLIC_SITE_PROTECTED`), el sitio sigue siendo **público** para cualquiera con el enlace.

**Si la contraseña no “entra”:** reinicia el servidor (`npm run dev` o redeploy). Comprueba en el navegador `GET /api/site-auth` — debe responder `sitePasswordConfigured: true` y `jwtSecretOk: true`. Si `jwtSecretOk` es false, alarga `ADMIN_JWT_SECRET` a ≥32 caracteres.

**Si la ruta principal no redirige a `/acceso`:** comprueba que tienes `NEXT_PUBLIC_SITE_PROTECTED="true"` en `.env`. Sin ella, el middleware no puede saber que la protección está activa (limitación del Edge Runtime).

#### QR con acceso (contraseña en el enlace)

Sí: puedes generar un código QR cuyo contenido sea una URL con **fragmento** `#c=…` (la contraseña va codificada, no en la query `?`). El fragmento **no se envía al servidor** al abrir la página; solo lo lee el navegador y la app intenta entrar sola.

Formato del texto del QR (sustituye dominio y contraseña):

```txt
https://TU_DOMINIO/acceso#c=CONTRASEÑA_URL_ENCODED
```

Ejemplo en JavaScript para obtener el texto exacto (ejecuta en la consola del navegador o un script local):

```js
const base = 'https://bodadulceyeduardo.xyz/acceso'
const password = 'LA_MISMA_QUE_SITE_PASSWORD'
console.log(`${base}#c=${encodeURIComponent(password)}`)
```

Si la contraseña es solo letras y números (ej. `InvitadosFE2026`), **`encodeURIComponent` no cambia el texto**: es normal que el enlace se vea igual; el encoding solo añade `%20`, `%40`, etc. cuando hay espacios, símbolos o acentos.

Luego pega esa cadena en cualquier generador de QR (qr-code-generator.com, el de Google, etc.).

**Importante:** quien tenga el QR (o una foto del mismo) puede entrar; úsalo solo en invitaciones físicas o canales privados, no lo publiques en redes abiertas.

## Variables de entorno

| Variable                          | Descripción                                      |
| --------------------------------- | ------------------------------------------------ |
| `DATABASE_URL`                    | URL de conexión PostgreSQL                       |
| `ADMIN_PASSWORD`                  | Contraseña del panel admin                       |
| `ADMIN_JWT_SECRET`                | Secreto JWT del panel admin (≥32 caracteres)      |
| `SITE_PASSWORD`                   | (Opcional) Contraseña para ver la web. Requiere `NEXT_PUBLIC_SITE_PROTECTED` y `ADMIN_JWT_SECRET`. |
| `NEXT_PUBLIC_SITE_PROTECTED`      | `"true"` si usas sitio privado; el Edge Runtime necesita este flag para activar la puerta. |
| `NEXT_PUBLIC_SITE_URL`            | (Opcional) URL pública del sitio para enlaces/QR |

**Contenido de la landing** (fechas, nombres, venue, WhatsApp, mesas de regalos, Pinterest, contactos, textos SEO, etc.):  
todas las variables `NEXT_PUBLIC_*` documentadas en **`.env.example`** (bloque “Landing pública”).  
Si no defines una variable, se usa el valor por defecto en `src/lib/constants.ts` (`SITE_DEFAULTS`).

## Despliegue en Vercel

El proyecto incluye `vercel.json` con el comando de build ya configurado (`prisma generate && next build`).

1. **Conecta el repo:** [vercel.com](https://vercel.com) → Import Git Repository → elige este repo.
2. **Variables de entorno** (Settings → Environment Variables). Añade al menos:
   - `DATABASE_URL` — PostgreSQL (ej. [Neon](https://neon.tech) o [Supabase](https://supabase.com), plan gratis).
   - `ADMIN_JWT_SECRET` — mínimo 32 caracteres, aleatorio (para el login del panel).
   - `ADMIN_PASSWORD` — contraseña del panel admin.
   - `SITE_PASSWORD` — (opcional) contraseña para invitados; si la usas, añade también `NEXT_PUBLIC_SITE_PROTECTED=true`.
3. **Build:** no cambies nada; Vercel usa el `buildCommand` de `vercel.json`.
4. **Despliega.** Tras el primer deploy, en tu máquina (con la misma `DATABASE_URL`) ejecuta:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
5. Opcionales: copia el bloque de **`.env.example`** (Landing pública) a las variables de Vercel para personalizar el evento sin cambiar código; o deja solo `DATABASE_URL`/`ADMIN_*` y se usarán los valores por defecto del código.

## Estructura del proyecto

```
src/
  app/
    api/           # API routes (meals, lodging, transport, makeup, admin)
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
    photos/        # Sección álbum (enlace a Google Fotos vía env)
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

- **Landing:** Hero con countdown, bienvenida, programa (próximamente), mesa de regalos, dress code, votación de platillos, vuelos, hospedaje (personas y habitaciones), traslados, maquillaje/peinado, enlace al álbum de fotos (Google Fotos), contacto, CTA WhatsApp.
- **Hospedaje:** Solicitud con personas, número de habitaciones y detalle opcional; opción compartir; instrucciones de pago; listado en admin.
- **Admin:** Login por contraseña, listados de platillos, hospedaje, maquillaje; actualizar estado de pago; exportar CSV.

## Mejoras futuras sugeridas

- Mover opciones de menú a BD o CMS para editarlas sin tocar código.
- Integración PayPal para apartado de habitaciones (estructura ya preparada con `paymentStatus`).
- Subida de imágenes del menú en elección de platillo (guardar URLs en `imageUrls`).
- Álbum: `NEXT_PUBLIC_PHOTOS_ALBUM_URL` apunta al álbum compartido (p. ej. Google Fotos).
- Autenticación admin más robusta (NextAuth o Supabase Auth) si se requiere.
- Más hoteles: añadir modelo `Hotel` y relación `LodgingRequest` → `Hotel`; pantalla de selección de hotel antes de habitaciones.

## Licencia

Uso privado para el evento.
