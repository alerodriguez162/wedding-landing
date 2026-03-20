import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/landing/Hero'
import { Welcome } from '@/components/landing/Welcome'
import { WeddingProgram } from '@/components/landing/WeddingProgram'
import { GiftRegistry } from '@/components/landing/GiftRegistry'
import { DressCode } from '@/components/landing/DressCode'
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
      <main className="pb-4 sm:pb-6">
        <Hero />
        <Welcome />
        <WeddingProgram />
        <GiftRegistry />
        <DressCode />
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
