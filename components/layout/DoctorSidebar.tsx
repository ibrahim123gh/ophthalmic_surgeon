import Image from "next/image";
import Link from "next/link";
import {
  LuClock3,
  LuEye,
  LuMapPin,
  LuPhone,
  LuShieldCheck,
  LuSparkles,
} from "react-icons/lu";

const specialties = [
  "Cataract Surgery",
  "LASIK & Refractive Care",
  "Retina Consultation",
  "Glaucoma Monitoring",
];

const navLinks = [
  "About",
  "Experience",
  "Services",
  "Cases",
  "Testimonials",
  "Contact",
];

export default function DoctorSidebar() {
  return (
    <aside className="rounded-none border border-border bg-surface">
      <div className="border-b border-border p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/25 bg-background">
            <Image src="/logoLight.png" alt="Doctor profile mark" width={48} height={48} />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
              Ophthalmology
            </p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">
              Dr. Jane Mellow
            </h2>
            <p className="mt-1 text-sm text-muted">
              Eye surgeon focused on precise, calm, patient-first care.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div className="grid gap-3">
          {navLinks.map((item) => (
            <Link
              key={item}
              href="#"
              className="flex items-center justify-between border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
            >
              <span>{item}</span>
              <LuSparkles size={16} />
            </Link>
          ))}
        </div>

        <div className="grid gap-3">
          {specialties.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 border border-border bg-background px-4 py-3"
            >
              <LuEye className="shrink-0 text-primary" size={18} />
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-3 border border-border bg-background p-4 text-sm text-foreground">
          <div className="flex items-start gap-3">
            <LuPhone className="mt-0.5 shrink-0 text-primary" size={16} />
            <div>
              <p className="font-medium">+961 70 000 000</p>
              <p className="text-muted">Direct appointment line</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <LuMapPin className="mt-0.5 shrink-0 text-primary" size={16} />
            <div>
              <p className="font-medium">Beirut Eye Center</p>
              <p className="text-muted">Private consultation clinic</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <LuClock3 className="mt-0.5 shrink-0 text-primary" size={16} />
            <div>
              <p className="font-medium">Mon - Sat, 9am - 6pm</p>
              <p className="text-muted">Emergency hours on request</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <LuShieldCheck className="mt-0.5 shrink-0 text-primary" size={16} />
            <div>
              <p className="font-medium">Trusted care</p>
              <p className="text-muted">Surgery, diagnosis, and follow-up</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
