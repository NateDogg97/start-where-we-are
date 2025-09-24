import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Start Where We Are Festival 2025 | Earth Music Festival Boston",
  description: "Boston's premier music & sustainability festival - November 13, 2025 at Bow Market. Live performances, eco initiatives, and community. Get tickets now!",
  keywords: "Boston music festival, Earth music festival, Bow Market events, Somerville festival, sustainable music festival, live music Boston, SWWA Festival",
  authors: [{ name: "Sofia Villarreal" }],
  creator: "Planet X Devs",
  publisher: "Start Where We Are",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.swwafestival.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Start Where We Are Festival 2025 | Earth Music Festival Boston",
    description: "Boston's premier music & sustainability festival - November 13, 2025 at Bow Market. Live performances, eco initiatives, and community.",
    url: 'https://www.swwafestival.com',
    siteName: 'Start Where We Are Festival',
    images: [
      {
        url: '/Logo_2x-100-nobg.png',
        width: 1200,
        height: 630,
        alt: 'Start Where We Are Festival 2025 Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Start Where We Are Festival 2025 | Earth Music Festival Boston",
    description: "Boston's premier music & sustainability festival - November 13, 2025 at Bow Market. Live performances, eco initiatives, and community.",
    images: ['/Logo_2x-100-nobg.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '',
    yandex: '',
    yahoo: '',
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
