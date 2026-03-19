import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/landing/Hero'
import { Welcome } from '@/components/landing/Welcome'
import { MealForm } from '@/features/meals/MealForm'
import { Flights } from '@/components/landing/Flights'
import { LodgingForm } from '@/features/lodging/LodgingForm'
import { Transfers } from '@/components/landing/Transfers'
import { MakeupForm } from '@/features/makeup/MakeupForm'
import { PhotoSection } from '@/features/photos/PhotoSection'
import { Contact } from '@/components/landing/Contact'
import { WhatsAppCta } from '@/components/landing/WhatsAppCta'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Welcome />
        <MealForm />
        <Flights />
        <LodgingForm />
        <Transfers />
        <MakeupForm />
        <PhotoSection />
        <Contact />
        <WhatsAppCta />
      </main>
      <Footer />
    </>
  )
}
