import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/stack/server";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Part-Time Jobs UK | CFO, CTO, CMO Roles | Part-Time Quest",
    template: "%s | Part-Time Quest"
  },
  description: "Discover the best part-time executive jobs in the UK. Browse part-time CFO, CMO, CTO and executive roles in London. Connect with leading part-time recruitment agencies and find flexible leadership opportunities.",
  keywords: ["part-time jobs", "part-time jobs UK", "part-time CFO", "part-time CTO", "part-time CMO", "part-time COO", "part-time executive", "flexible executive", "part-time recruitment agencies", "London part-time jobs"],
  authors: [{ name: "Part-Time Quest" }],
  creator: "Part-Time Quest",
  publisher: "Part-Time Quest",
  metadataBase: new URL("https://parttime.quest"),
  alternates: {
    canonical: "https://parttime.quest",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://parttime.quest",
    siteName: "Part-Time Quest",
    title: "Part-Time Jobs UK | CFO, CTO, CMO Roles",
    description: "Discover the best part-time executive jobs in the UK. Browse part-time CFO, CMO, CTO and executive roles in London.",
    // Images auto-generated from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Part-Time Jobs UK | Part-Time Quest",
    description: "Discover the best part-time executive jobs in the UK. Browse part-time CFO, CMO, CTO and executive roles.",
    site: "@parttimequest",
    creator: "@parttimequest",
    // Images auto-generated from app/twitter-image.tsx
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Structured Data for the site
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://parttime.quest/#organization",
  name: "Part-Time Quest",
  alternateName: ["Part-Time Quest", "PartTimeQuest"],
  url: "https://parttime.quest",
  logo: {
    "@type": "ImageObject",
    url: "https://parttime.quest/logo.svg",
    width: "512",
    height: "512"
  },
  image: "https://parttime.quest/logo.svg",
  description: "UK marketplace for part-time executive jobs and services. Browse part-time CFO, CTO, CMO roles or hire part-time executives.",
  foundingDate: "2024",
  sameAs: [
    "https://twitter.com/parttimequest",
    "https://linkedin.com/company/parttimequest"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://parttime.quest/contact",
    availableLanguage: "English"
  },
  areaServed: {
    "@type": "Country",
    name: "United Kingdom"
  }
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Part-Time Quest",
  alternateName: ["Part-Time Quest", "PartTimeQuest", "Part-Time Jobs UK"],
  url: "https://parttime.quest",
  description: "UK marketplace for part-time executive jobs and services. Browse part-time CFO, CMO, CTO roles.",
  inLanguage: "en-GB",
  publisher: {
    "@type": "Organization",
    name: "Part-Time Quest",
    url: "https://parttime.quest",
    logo: {
      "@type": "ImageObject",
      url: "https://parttime.quest/logo.svg"
    }
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://parttime.quest/part-time-jobs?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-white text-gray-900`}
      >
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <Suspense fallback={<div className="h-16 bg-white border-b border-gray-200" />}>
              <Navigation />
            </Suspense>
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <CookieConsent />
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
