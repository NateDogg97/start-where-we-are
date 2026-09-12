import { Metadata } from 'next';
import { PressPageClient } from './press-page-client';
import { pressPageSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Press & Media | Start Where We Are Festival 2026',
  description: 'Press coverage, media features and press contact for Start Where We Are Festival — a free benefit concert for the environment at Bow Market in Somerville, MA on September 23, 2026.',
  alternates: {
    canonical: '/press',
  },
  openGraph: {
    title: 'Press & Media | Start Where We Are Festival 2026',
    description: 'Press coverage, media features and press contact for Start Where We Are Festival — a free benefit concert for the environment at Bow Market in Somerville, MA.',
    url: 'https://www.swwafestival.com/press',
    siteName: 'Start Where We Are Festival',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The courtyard at Bow Market in Somerville, MA, home of the Start Where We Are Festival',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function PressPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pressPageSchema) }}
      />
      <PressPageClient />
    </>
  );
}