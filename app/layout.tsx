import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { siteGraph, EVENT } from "@/lib/structured-data";
import "./globals.css";

const TITLE = "Start Where We Are Earth Music Festival 2026 | Free Benefit Concert in Somerville, MA";
const DESCRIPTION =
  "Free, all-ages live music benefit concert for the environment — Wednesday, September 23, 2026, 6–10 PM at Bow Market in Somerville, minutes from Boston. Six local artists, courtyard fires, eco-friendly vendors, food & drink. Suggested $15 donation.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s | Start Where We Are Festival",
  },
  description: DESCRIPTION,
  applicationName: "Start Where We Are Festival",
  category: "Music Festival",
  classification: "Live Music Event, Benefit Concert, Sustainability Festival",
  keywords: [
    "things to do in Boston",
    "things to do in Boston this week",
    "things to do in Boston this weekend",
    "free events in Boston",
    "free things to do in Boston",
    "Boston events September 2026",
    "Somerville events",
    "Union Square Somerville events",
    "Bow Market events",
    "Upstairs at Bow",
    "live music Boston",
    "live music Somerville",
    "live music near me",
    "Boston music festival",
    "benefit concert Boston",
    "environmental benefit concert",
    "sustainability festival Boston",
    "climate event Boston",
    "eco festival Massachusetts",
    "Earth music festival",
    "Start Where We Are Festival",
    "SWWA Festival",
  ],
  authors: [{ name: "Sofia Villarreal", url: "https://sofiavillarrealmusic.com/" }],
  creator: "Planet X Devs",
  publisher: "Start Where We Are Festival",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.swwafestival.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.swwafestival.com",
    siteName: "Start Where We Are Festival",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The courtyard at Bow Market in Somerville, MA, home of the Start Where We Are Festival",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "United States",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
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
  verification: {
    google: "",
    yandex: "",
    yahoo: "",
  },
  // Non-standard tags that location-aware and event-aware crawlers still read.
  other: {
    "geo.region": "US-MA",
    "geo.placename": "Somerville, Massachusetts",
    "geo.position": "42.3813;-71.0980",
    ICBM: "42.3813, -71.0980",
    "event:start_time": EVENT.startDate,
    "event:end_time": EVENT.endDate,
    "event:location": "Upstairs at Bow, Bow Market, 1 Bow Market Way, Somerville, MA 02143",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/vhz6nhr.css" />

        {/* MailerLite Script */}
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
              .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
              n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
              (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
              ml('account', '1646113');
            `
          }}
        />

        {/* GiveButter Widgets Script */}
        <Script
          async
          src={`https://widgets.givebutter.com/latest.umd.cjs?acct=${process.env.NEXT_PUBLIC_GIVE_BUTTER_ACCOUNT_ID}&p=other`}
          strategy="afterInteractive"
        />

        {/* Structured data: organization, founder, website, venue and event (shared by every page) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }}
        />

      </head>
      <body
        className="antialiased"
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
