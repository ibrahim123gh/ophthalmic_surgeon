import AppointmentsHero from "@/components/page/appointments/AppointmentsHero ";
import AvailabilitySection from "@/components/page/appointments/AvailabilitySection";
import BookingCTA from "@/components/page/appointments/BookingCTA";
import SurgicalExpertise from "@/components/page/appointments/SurgicalExpertise";

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