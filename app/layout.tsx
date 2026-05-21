import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import ThemeProvider from "@/components/theme/ThemeProvider";
import Footer from "@/components/layout/Footer";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { getSeoBySlug, seoToMetadata } from "@/lib/seo";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair-display",
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoBySlug("home");

  return seoToMetadata(seo, {
    title: "Dr. Bachir Abiad",
    description: "Dr. Bachir Abiad ophthalmology clinic website.",
    keywords: ["ophthalmology", "clinic"],
  });
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
