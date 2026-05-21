import AboutDoctor from '@/components/page/Home/AboutDoctor'
import ClinicInfo from '@/components/page/Home/ClinicInfo'
import HeroSwiper from '@/components/page/Home/Hero'
import Testimonials from '@/components/page/Home/PatientTestimonial'
import ServicesSection from '@/components/page/Home/ServicesSection'
import WhyChooseUs from '@/components/page/Home/WhyChooseUs'
import { getSeoBySlug, seoToMetadata } from '@/lib/seo'
import React from 'react'

export async function generateMetadata() {
  const seo = await getSeoBySlug("home");

  return seoToMetadata(seo, {
    title: "Home Page",
    description: "Dr. Bachir Abiad ophthalmology clinic homepage.",
    keywords: ["home", "landing"],
  });
}

const HomePage = () => {
  return (
    <>
    <HeroSwiper />
    <AboutDoctor />
    <ServicesSection />
    <WhyChooseUs />
    <Testimonials />
    <ClinicInfo />
    </>
  )
}

export default HomePage
