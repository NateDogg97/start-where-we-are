import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Start Where We Are Festival 2025",
  description: "Boston's premier music festival - October 15-17, 2025. Experience incredible performances, local art, and community.",
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
      </head>
      <body
        className="antialiased"
      >
        <Header />
        {children}
        <Footer />

        {/* GiveButter Widgets Script */}
        <Script
          async
          src={`https://widgets.givebutter.com/latest.umd.cjs?acct=${process.env.NEXT_PUBLIC_GIVE_BUTTER_ACCOUNT_ID}&p=other`}
          strategy="afterInteractive"
        />

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
      </body>
    </html>
  );
}
