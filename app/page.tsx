'use client';

import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Virtual } from 'swiper/modules';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/progress-bar';
import { Counter } from '@/components/counter';
import { GoogleMapsEmbed } from '@next/third-parties/google';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/virtual';

export default function Home() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const bands = [
    { id: 1, name: 'The Midnight Echo', genre: 'Indie Rock', src: '/Screen Shot 2025-08-10 at 5.13.45 PM.webp' },
    { id: 2, name: 'Velvet Thunder', genre: 'Electronic', src: '/pexels-mralexphotography-33323757.webp' },
    { id: 3, name: 'Harbor Lights', genre: 'Folk', src: '/pexels-khoa-vo-2347168-5288861.webp' },
    { id: 4, name: 'Neon Dreams', genre: 'Synthwave', src: '/pexels-anderson-cavalera-862834-1865444.webp' },
    { id: 5, name: 'The Wild Hearts', genre: 'Alternative', src: '/pexels-roudy-salameh-977555-2692080.webp' },
  ];

  useEffect(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;

    if (!video1 || !video2) return;

    let activeVideo = video1;
    let inactiveVideo = video2;
    let isTransitioning = false;

    // Initialize - video1 plays on top, video2 is below and paused
    video1.style.opacity = '1';
    video1.style.zIndex = '2';
    video2.style.opacity = '1';
    video2.style.zIndex = '1';
    video2.pause();

    const handleTimeUpdate = (event: Event) => {
      const video = event.target as HTMLVideoElement;
      
      // Only handle timeupdate from the currently active video
      if (video !== activeVideo || isTransitioning) return;

      const currentTime = video.currentTime;
      const duration = video.duration;
      
      // Start backup video playing 0.5 seconds before end (before fade starts)
      if (duration - currentTime <= 0.5 && inactiveVideo.paused) {
        // Start the backup video playing underneath
        inactiveVideo.currentTime = 0;
        inactiveVideo.play();
      }
      
      // Start fade transition 0.3 seconds before end
      if (duration - currentTime <= 0.3) {
        isTransitioning = true;
        
        // Fade out current video over 300ms (backup is already playing)
        activeVideo.style.opacity = '0';
        
        // Complete the transition after fade
        setTimeout(() => {
          // Swap z-index - make the now-playing video on top
          inactiveVideo.style.zIndex = '2';
          activeVideo.style.zIndex = '1';
          
          // Reset opacity for next transition
          activeVideo.style.opacity = '1';
          
          // Reset inactive video to first frame and pause
          activeVideo.currentTime = 0;
          activeVideo.pause();
          
          // Swap references
          [activeVideo, inactiveVideo] = [inactiveVideo, activeVideo];
          
          // Reset transition flag
          isTransitioning = false;
        }, 300);
      }
    };

    // Add event listeners
    video1.addEventListener('timeupdate', handleTimeUpdate);
    video2.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video1.removeEventListener('timeupdate', handleTimeUpdate);
      video2.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
        {/* Background Videos for Seamless Loop */}
        <video
          ref={video1Ref}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ zIndex: 1 }}
        >
          <source src="/videos/3177845-uhd_3840_2160_24fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <video
          ref={video2Ref}
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ zIndex: 2 }}
        >
          <source src="/videos/3177845-uhd_3840_2160_24fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" style={{ zIndex: 3 }} />
        
        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto text-center text-white" style={{ zIndex: 4 }}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            Start Where We Are
          </h1>
          <p className="text-2xl md:text-3xl opacity-90 mb-4">
            Music Festival 2025
          </p>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Boston, MA • October 15, 2025
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="px-8 text-lg bg-white text-black hover:bg-white/90">
              Get Tickets
            </Button>
            <Button size="lg" variant="outline" className="px-8 text-lg border-white text-black hover:bg-white hover:text-black">
              View Lineup
            </Button>
          </div>
        </div>
      </section>

      {/* Bands Carousel Section */}
      <section id="lineup" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Featured Artists
          </h2>
          <p className="text-xl text-muted-foreground text-center">
            Experience incredible performances from these amazing bands
          </p>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Custom Navigation Buttons */}
          <div className="flex gap-2 mb-4">
            <button className="swiper-button-prev-custom w-10 h-10 rounded-full border border-border bg-background hover:bg-accent transition-colors flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button className="swiper-button-next-custom w-10 h-10 rounded-full border border-border bg-background hover:bg-accent transition-colors flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          <Swiper
            modules={[Navigation, Autoplay, Virtual]}
            spaceBetween={20}
            slidesPerView={3}
            slidesPerGroup={1}
            loop={false}
            virtual={{
              enabled: true,
              addSlidesBefore: 2,
              addSlidesAfter: 2,
            }}
            centeredSlides={false}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            className="swiper-custom"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            {bands.map((band, index) => (
              <SwiperSlide key={band.id} virtualIndex={index}>
                <Card className="overflow-hidden border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative group cursor-pointer">
                      {/* Placeholder 9:16 aspect ratio image */}
                      <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-primary/40 overflow-hidden">
                        <img
                          src={band.src}
                          alt={band.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {/* Band Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                        <h3 className="text-2xl font-bold mb-1">{band.name}</h3>
                        <p className="text-sm opacity-90">{band.genre}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Image Left, Text Right Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg overflow-hidden">
            <img
              src="/CarlieFebo-17062.webp"
              alt="Festival Experience"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Text Side */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Experience the Magic
            </h2>
            <p className="text-lg text-muted-foreground">
              Join us for three unforgettable days of music, art, and community in the heart of Boston.
            </p>
            
            {/* Bullet Points */}
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Over 30 incredible artists across 3 stages</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Local food vendors and craft beverages</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Interactive art installations and workshops</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>VIP experiences and backstage access available</span>
              </li>
            </ul>
            
            {/* CTA Button */}
            <div className="pt-4">
              <Button size="lg" className="px-8">
                Get Your Pass Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Bar Section */}
      <section className="py-24 px-6 bg-accent/30">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Limited Tickets Available
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't miss out on Boston's premier music festival. Our early bird tickets are selling fast, 
            and once they're gone, regular pricing begins.
          </p>
          
          {/* Progress Bar Component */}
          <div className="max-w-xl mx-auto">
            <ProgressBar 
              label="Campaign Progress"
              campaignId="449584"
              // Fallback values if API fails
              currentValue={73}
              maxValue={100}
            />
          </div>
          
          <div className="space-y-4">
            <Button size="lg" className="px-8">
              <a href="https://givebutter.com/swwafestival" target="_blank">
                Support the Campaign
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            2023 Success
          </h2>
          
          {/* Stats Grid */}
          <div className="max-w-[600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center space-y-2">
              <div className="text-5xl md:text-6xl font-bold text-primary">
                <Counter to={250} suffix="+" duration={2.5} />
              </div>
              <p className="text-lg text-muted-foreground">People Attended</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-5xl md:text-6xl font-bold text-primary">
                <Counter to={6} duration={1.5} />
              </div>
              <p className="text-lg text-muted-foreground">Amazing Bands</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-5xl md:text-6xl font-bold text-primary">
                <Counter to={80} suffix="+" duration={2} />
              </div>
              <p className="text-lg text-muted-foreground">Talented Musicians</p>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="text-center">
            <Button size="lg" className="px-8">
              Join the Experience
            </Button>
          </div>
        </div>
      </section>

      {/* Text Left, Image Right Section */}
      <section className="py-24 px-6 bg-accent/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Side */}
          <div className="space-y-6 order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold">
              A Festival Built by the Community
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Start Where We Are isn't just another music festival – it's a celebration of Boston's 
              vibrant music scene and the community that makes it thrive. Born from a love of live 
              music and local culture, our festival brings together emerging artists and established 
              performers on one incredible weekend.
            </p>
            
            <p className="text-lg text-muted-foreground">
              Every year, we partner with local businesses, artists, and organizations to create 
              an experience that goes beyond the music. From food trucks featuring Boston's best 
              cuisine to art installations by local creators, every aspect of the festival reflects 
              the spirit of our city.
            </p>
            
            <p className="text-lg text-muted-foreground">
              When you attend Start Where We Are, you're not just watching performances – you're 
              participating in a movement that supports independent artists, fosters creativity, 
              and builds lasting connections within our community.
            </p>
          </div>
          
          {/* Image Side */}
          <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg overflow-hidden order-1 lg:order-2">
            <img
              src="/Screen Shot 2025-08-10 at 5.13.32 PM.webp"
              alt="Community Festival"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Location Section with Google Maps */}
      <section className="py-24 px-6" id="location">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Find Us in Boston
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The festival takes place at Boston Common, right in the heart of the city. 
              Easy access via public transportation and plenty of nearby parking options.
            </p>
          </div>
          
          {/* Map Container */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <GoogleMapsEmbed
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
              height={500}
              width="100%"
              mode="place"
              q="Bow Market, Somerville, MA"
            />
          </div>
          
          {/* Location Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Venue Location</h3>
              <p className="text-muted-foreground">
                Boston Common<br />
                139 Tremont St<br />
                Boston, MA 02111
              </p>
            </div>
            
            <div className="text-center">
              <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Festival Dates</h3>
              <p className="text-muted-foreground">
                October 15-17, 2025<br />
                Gates open at 2:00 PM daily<br />
                Rain or shine
              </p>
            </div>
            
            <div className="text-center">
              <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Contact Info</h3>
              <p className="text-muted-foreground">
                Email: info@swwafestival.com<br />
                Phone: (617) 555-0123<br />
                Available Mon-Fri 9AM-5PM EST
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
            src="/CarlieFebo-17040 (1).webp"
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
          <div className="text-center text-white space-y-6 max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-bold">
              Follow Our Journey
            </h2>
            <p className="text-xl md:text-2xl opacity-90">
              Get behind-the-scenes content, artist announcements, and exclusive updates on our Instagram page.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="px-8 text-lg bg-white text-black hover:bg-white/90" asChild>
                <a href="https://www.instagram.com/startwherewearefestival/" target="_blank" rel="noopener noreferrer">
                  Follow Us on Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}