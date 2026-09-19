'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Counter } from '@/components/counter';
import { GoogleMapsEmbed } from '@next/third-parties/google';
import { motion, useScroll, useTransform, useInView, Variants } from 'framer-motion';
import { MailerLiteForm } from '@/components/MailerLiteForm';
import { SponsorsCarousel } from '@/components/sponsors-carousel';
import { ARTISTS } from '@/lib/structured-data';

// Bow Market Slideshow Component
function BowMarketSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { src: '/_EST1927.webp', alt: 'Cute pug in Bow Market' },
    { src: '/_EST5180.webp', alt: 'Bird\'s eye view of musicians in Bow Market' },
    { src: '/_EST8141.webp', alt: 'People sitting at dining tables with fireplaces in Bow Market' },
    { src: '/Welcome-to-bow-market.webp', alt: 'A "Welcome to Bow Market" sign.' },
    { src: '/CarlieFebo-5319+copy.webp', alt: 'A young couple laughing around a dining table fireplace at Bow Market.' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <motion.div
      className="relative aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <motion.img
          key={index}
          src={slide.src}
          alt={slide.alt}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </motion.div>
  );
}

export function HomeClient() {
  const { scrollYProgress } = useScroll();

  // Animation variants
  const fadeInScale: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100]"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
        {/* Background Artwork */}
        <Image
          src="/hero01.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_50%]"
        />

        {/* Content Overlay */}
        <motion.div
          className="relative z-10 flex-1 flex flex-col w-full max-w-7xl mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-20"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="flex-1 flex flex-col justify-center max-w-xl lg:max-w-2xl">
            <motion.h1 className="mb-6 md:mb-8" variants={fadeInScale}>
              <Image
                src="/logo.png"
                alt="Start Where We Are Eco Music Festival 2026"
                width={1033}
                height={275}
                priority
                className="block w-full max-w-[20rem] sm:max-w-[26rem] lg:max-w-[34rem] h-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
              />
            </motion.h1>

            <motion.p
              className="font-condensed font-black uppercase tracking-wide text-primary text-4xl sm:text-5xl leading-none mb-4"
              variants={fadeUp}
            >
              Eco Music Festival 2026
            </motion.p>

            <motion.div
              className="font-condensed font-black uppercase tracking-wide text-festival-ink text-xl sm:text-2xl lg:text-[1.75rem] leading-tight space-y-0.5 mb-8"
              variants={fadeUp}
            >
              <p className="text-white">Bow Market</p>
              <p>1 Bow Mkt Wy, Somerville, MA 02143</p>
              <p className="text-white">Wednesday, Sept 23, 2026</p>
              <p>6PM&ndash;10PM</p>
            </motion.div>

            <motion.div className="flex" variants={fadeUp}>
              <motion.div whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400 }}>
                <Button
                  size="lg"
                  className="h-auto px-12 py-4 text-2xl rounded-lg bg-festival-mint text-festival-ink hover:bg-festival-mint/90 hover:scale-105 transition-transform shadow-lg"
                  asChild
                >
                  <a href="https://www.eventbrite.com/e/start-where-we-are-earth-music-festival-2026-tickets-1998927218119?aff=oddtdtcreator" target="_blank" rel="noopener noreferrer">
                    Get Tickets!
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <motion.p
            className="font-condensed font-black uppercase tracking-wide text-festival-mint text-xl sm:text-2xl lg:text-3xl leading-tight mt-12 lg:mt-0 lg:self-end lg:text-right max-w-3xl"
            variants={fadeUp}
          >
            Benefit concert for environmental organizations
          </motion.p>
        </motion.div>
      </section>

      {/* Artists Section */}
      <section id="lineup" className="py-24 px-6 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl mb-4">Artists</h2>
            <p className="text-xl text-muted-foreground">
              Meet the 2026 lineup
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {ARTISTS.map((artist) => (
              <motion.div key={artist.name} variants={staggerItem}>
                <Card className="overflow-hidden border-0 shadow-lg">
                  <CardContent className="p-0">
                    <a
                      href={artist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block group"
                    >
                      <div className="relative aspect-[4/5] bg-gradient-to-br from-primary/20 to-primary/40 overflow-hidden">
                        <Image
                          src={artist.image}
                          alt={artist.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                        <h3 className="text-2xl">{artist.name}</h3>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience the Magic - Bow Market Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Slideshow Side */}
          <BowMarketSlideshow />

          {/* Text Side */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl md:text-5xl"
              variants={staggerItem}
            >
              Experience the Magic
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground"
              variants={staggerItem}
            >
              Set in the heart of{' '}
              <a
                href="https://www.bowmarketsomerville.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                Bow Market
              </a>
              , Somerville's courtyard of local food, art, and community.
            </motion.p>
            <motion.p
              className="text-lg text-muted-foreground"
              variants={staggerItem}
            >
              The heart of the festival is Upstairs at Bow, a cozy indoor space perfect for live music,
              while the open courtyard below invites you to gather by the fire, grab a bite, or wander
              through local shops between sets.
            </motion.p>

            {/* Bullet Points */}
            <motion.ul
              className="space-y-3"
              variants={staggerContainer}
            >
              {[
                "🎶 **Live performances** from local artists",
                "🔥 **Courtyard fires** + cozy fall vibes",
                "🌱 **Eco-friendly vendors** & climate organizations",
                "🍴 **Food + drink** from Bow Market's award-winning businesses",
                "🤝 **Ways to sign up**, connect & take climate action"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  variants={staggerItem}
                >
                  <span className="text-lg" dangerouslySetInnerHTML={{
                    __html: item
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }} />
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA Button */}
            <motion.div
              className="pt-4"
              variants={staggerItem}
            >
              <motion.div whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400 }}>
                <Button size="lg" className="px-8 text-lg hover:scale-105 transition-transform" asChild>
                  <a href="https://www.eventbrite.com/e/start-where-we-are-earth-music-festival-2026-tickets-1998927218119?aff=oddtdtcreator" target="_blank" rel="noopener noreferrer">
                    Get Your Pass Now
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Text Left, Image Right Section */}
      <section id="about" className="py-24 px-6 bg-accent/20 scroll-mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Side */}
          <motion.div
            className="space-y-6 order-2 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl md:text-5xl"
              variants={staggerItem}
            >
              A Festival Built by the Community
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground"
              variants={staggerItem}
            >
              Start Where We Are isn't just another music festival – it's a celebration of Boston's
              vibrant music scene and the community that makes it thrive. Born from a love of live
              music and local culture, our festival brings together emerging artists and established
              performers on one incredible weekend.
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground"
              variants={staggerItem}
            >
              Every year, we partner with local businesses, artists, and organizations to create
              an experience that goes beyond the music. From food trucks featuring Boston's best
              cuisine to art installations by local creators, every aspect of the festival reflects
              the spirit of our city.
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground"
              variants={staggerItem}
            >
              When you attend Start Where We Are, you're not just watching performances – you're
              participating in a movement that supports independent artists, fosters creativity,
              and builds lasting connections within our community.
            </motion.p>
          </motion.div>

          {/* Image Side */}
          <motion.div
            className="relative aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg overflow-hidden order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/Screen Shot 2025-08-10 at 5.13.32 PM.webp"
              alt="Community Festival"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-24 px-6 bg-muted/30">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2
            className="font-display text-5xl md:text-6xl mb-6"
            variants={staggerItem}
          >
            Stay in the Loop
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            variants={staggerItem}
          >
            Get exclusive updates on performers, sustainability initiatives, and festival news delivered to your inbox.
          </motion.p>

          {/* MailerLite Newsletter Form */}
          <motion.div
            className="w-full"
            variants={staggerItem}
          >
            {/* <div className="ml-embedded" data-form="rqgYda"></div> */}
            <MailerLiteForm />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section - No animations as requested */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-center mb-16">
            SWWA 2023
          </h2>

          {/* Stats Grid */}
          <div className="max-w-[600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center space-y-2">
              {/* People Icon */}
              <svg className="w-12 h-12 text-primary mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div className="text-5xl md:text-6xl font-bold text-primary">
                <Counter to={250} suffix="+" duration={2.5} />
              </div>
              <p className="text-lg text-muted-foreground">Attendees</p>
            </div>

            <div className="text-center space-y-2">
              {/* Music Icon */}
              <svg className="w-12 h-12 text-primary mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <div className="text-5xl md:text-6xl font-bold text-primary">
                <Counter to={80} suffix="+" duration={2} />
              </div>
              <p className="text-lg text-muted-foreground">Musicians</p>
            </div>

            <div className="text-center space-y-2">
              {/* Leaf/Eco Icon */}
              <svg className="w-12 h-12 text-primary mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <div className="text-5xl md:text-6xl font-bold text-primary">
                <Counter to={4} suffix="+" duration={1.5} />
              </div>
              <p className="text-lg text-muted-foreground">Eco Collaborations</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <motion.div whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400 }}>
              <Button size="lg" className="px-8 hover:scale-105 transition-transform text-lg" asChild>
                <a href="https://www.eventbrite.com/e/start-where-we-are-earth-music-festival-2026-tickets-1998927218119?aff=oddtdtcreator" target="_blank" rel="noopener noreferrer">
                  Join the Experience
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sponsors Carousel Section */}
      <SponsorsCarousel />

      {/* Location Section with Google Maps - No animations as requested */}
      <section className="py-24 px-6 scroll-mt-16" id="location">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4">
              Find Us in Somerville
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The festival takes place at Upstairs at Bow in{' '}
              <a
                href="https://www.bowmarketsomerville.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                Bow Market, Somerville
              </a>
              . Easy access via public transportation and nearby parking options. Indoor venue - rain or shine!
            </p>
          </div>
          
          {/* Map Container */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <GoogleMapsEmbed
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
              height={500}
              width="100%"
              mode="place"
              q="1 Bow Mkt Wy, Somerville, MA 02143"
            />
          </div>
          
          {/* Location Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-xl mb-2">Venue Location</h3>
              <p className="text-muted-foreground">
                Upstairs at Bow - Bow Market<br />
                1 Bow Mkt Wy<br />
                Somerville, MA 02143
              </p>
            </div>
            
            <div className="text-center">
              <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl mb-2">Festival Date & Time</h3>
              <p className="text-muted-foreground">
                Wednesday, September 23rd from 6-10:00 PM<br />
                Rain or Shine (Indoor Venue)
              </p>
            </div>
            
            <div className="text-center">
              <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3 className="text-xl mb-2">Contact Info</h3>
              <p className="text-muted-foreground">
                Email: startwherewearefestival@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="relative h-96 w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/CarlieFebo-17040.webp"
            alt="Festival Stage Background"
            fill
            className="object-cover"
            priority={false}
            unoptimized
          />
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Content Overlay */}
        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <motion.div 
            className="text-center text-white space-y-6 max-w-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl md:text-6xl"
              variants={fadeInScale}
            >
              Follow Our Journey
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl opacity-90"
              variants={fadeUp}
            >
              Get behind-the-scenes content, artist announcements, and exclusive updates on our Instagram page.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
              variants={fadeUp}
            >
              <motion.div whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400 }}>
                <Button size="lg" className="px-8 text-lg hover:scale-105 transition-transform" asChild>
                  <a href="https://www.instagram.com/startwherewearefestival/" target="_blank" rel="noopener noreferrer">
                    Follow Us on Instagram
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}