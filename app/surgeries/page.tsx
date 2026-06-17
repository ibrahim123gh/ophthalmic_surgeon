import type { Metadata } from 'next'
import ServicesSection from '@/components/page/Home/ServicesSection'
import { getSeoBySlug, seoToMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoBySlug('surgeries')
  return seoToMetadata(seo, {
    title: 'Surgeries',
    description: 'Explore ophthalmology surgeries and specialized eye care procedures.',
    keywords: ['surgeries', 'ophthalmology', 'eye surgery'],
  })
}

export default function SurgeriesPage() {
  return <ServicesSection />
}
