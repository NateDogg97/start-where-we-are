import { Metadata } from 'next';
import { PressPageClient } from './press-page-client';

export const metadata: Metadata = {
  title: 'Press & Media | Start Where We Are Festival 2025',
  description: 'Read press coverage and media features about Start Where We Are Festival. Boston\'s premier music & sustainability festival at Bow Market.',
  alternates: {
    canonical: '/press',
  },
  openGraph: {
    title: 'Press & Media | Start Where We Are Festival 2025',
    description: 'Read press coverage and media features about Start Where We Are Festival. Boston\'s premier music & sustainability festival at Bow Market.',
    url: 'https://www.swwafestival.com/press',
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
};

export default function PressPage() {
  return <PressPageClient />;
}