import AboutDoctor from '@/components/page/Home/AboutDoctor'
import ClinicInfo from '@/components/page/Home/ClinicInfo'
import HeroSwiper from '@/components/page/Home/Hero'
import Testimonials from '@/components/page/Home/PatientTestimonial'
import ServicesSection from '@/components/page/Home/ServicesSection'
import WhyChooseUs from '@/components/page/Home/WhyChooseUs'
import React from 'react'

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