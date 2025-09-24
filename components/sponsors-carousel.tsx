'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const sponsors = [
  { src: '/sponsors/berklee logo.png', alt: 'Berklee', width: 150, height: 60 },
  { src: '/sponsors/bgjilogo.png', alt: 'BGJI', width: 150, height: 60 },
  { src: '/sponsors/bow market.webp', alt: 'Bow Market', width: 150, height: 60 },
  { src: '/sponsors/JGJ.jpg', alt: 'JGJ', width: 150, height: 60 },
  { src: '/sponsors/liberal arts.png', alt: 'Liberal Arts', width: 150, height: 60 },
  { src: '/sponsors/life alive.png', alt: 'Life Alive', width: 150, height: 60 },
];

export function SponsorsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPos = 0;

    const animate = () => {
      scrollPos += 0.5;

      if (scrollContainer.scrollWidth > 0) {
        const maxScroll = scrollContainer.scrollWidth / 2;

        if (scrollPos >= maxScroll) {
          scrollPos = 0;
        }

        scrollContainer.scrollLeft = scrollPos;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <section className="py-24 overflow-hidden bg-accent/10">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-4xl md:text-5xl text-center mb-4">
          Our Sponsors & Partners
        </h2>
        <p className="text-xl text-muted-foreground text-center">
          Thank you to our amazing community partners who make this festival possible
        </p>
      </div>

      <div className="relative w-full">
        <div
          ref={scrollRef}
          className="flex gap-16 overflow-x-hidden"
          style={{ scrollBehavior: 'auto' }}
        >
          <div className="flex gap-16 animate-none min-w-max">
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <div
                key={`${sponsor.alt}-${index}`}
                className="flex-shrink-0 h-20 flex items-center justify-center"
              >
                <div className="relative h-full w-40 duration-300">
                  <Image
                    src={sponsor.src}
                    alt={sponsor.alt}
                    fill
                    className="object-contain"
                    sizes="160px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}