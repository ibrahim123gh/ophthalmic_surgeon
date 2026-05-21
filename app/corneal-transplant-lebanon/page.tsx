import AppointmentsHero from "@/components/page/appointments/AppointmentsHero ";
import AvailabilitySection from "@/components/page/appointments/AvailabilitySection";
import BookingCTA from "@/components/page/appointments/BookingCTA";
import SurgicalExpertise from "@/components/page/appointments/SurgicalExpertise";
import { getSeoBySlug, seoToMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoBySlug("availability");

  return seoToMetadata(seo, {
    title: "Availability",
    description: "Appointment availability and clinic access information.",
    keywords: ["availability"],
  });
}

export default function AppointmentsPage() {
  return (
    <main className="overflow-hidden bg-background">
      <AppointmentsHero />
      <AvailabilitySection />
      <BookingCTA />
      <SurgicalExpertise />
    </main>
  );
}
