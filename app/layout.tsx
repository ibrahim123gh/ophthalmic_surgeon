import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import ThemeProvider from "@/components/theme/ThemeProvider";
import Footer from "@/components/layout/Footer";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { getSeoBySlug, seoToMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair-display",
});

const siteUrl = getSiteUrl();

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Dr. Bachir Abiad",
      description: "Dr. Bachir Abiad ophthalmology clinic website.",
      inLanguage: "en",
      publisher: {
        "@id": `${siteUrl}/#physician`,
      },
    },
    {
      "@type": "Physician",
      "@id": `${siteUrl}/#physician`,
      name: "Dr. Bachir Abiad",
      url: siteUrl,
      description: "Specialized ophthalmology care led by Dr. Bachir Abiad.",
      medicalSpecialty: "Ophthalmology",
      telephone: "+96181778142",
      email: "info@drbachirabiad.com",
      areaServed: "Lebanon",
      worksFor: {
        "@type": "MedicalClinic",
        name: "Dr. Bachir Abiad Ophthalmology Clinic",
        url: siteUrl,
      },
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoBySlug("home");

  return {
    ...seoToMetadata(seo, {
      title: "Dr. Bachir Abiad",
      description: "Dr. Bachir Abiad ophthalmology clinic website.",
      keywords: ["ophthalmology", "clinic"],
    }),
    metadataBase: new URL(getSiteUrl()),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfairDisplay.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var key = "ophthalmic-theme";
                  var stored = localStorage.getItem(key);
                  var system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                  var theme = stored === "light" || stored === "dark" ? stored : system;
                  document.documentElement.dataset.theme = theme;
                } catch (error) {}
              })();
            `,
          }}
        />
        <ReduxProvider>
          <ThemeProvider>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
