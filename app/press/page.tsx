'use client';

import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function PressPage() {
  const pressArticles = [
    {
      id: 1,
      title: "Meet Sofia Villarreal",
      publication: "Canvas Rebel",
      date: "2024",
      excerpt: "An interview with Sofia Villarreal, founder of Start Where We Are Festival, discussing the vision behind Boston's grassroots music and sustainability festival.",
      url: "https://canvasrebel.com/meet-sofia-villarreal/",
      imageUrl: "/press/canvas-rebel.jpg"
    }
  ];

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
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

  return (
    <div className="min-h-screen flex flex-col pt-[77px]">
      {/* Hero Section */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-primary/5 to-transparent">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Press & Media
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Read about Start Where We Are Festival in the news and media. For press inquiries, please contact us at{' '}
            <a href="mailto:startwherewearefestival@gmail.com" className="text-primary hover:underline">
              startwherewearefestival@gmail.com
            </a>
          </p>
        </motion.div>
      </section>

      {/* Press Articles Section */}
      <section className="pb-24 px-6">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressArticles.map((article) => (
              <motion.div
                key={article.id}
                variants={fadeIn}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Publication & Date */}
                    <div className="flex justify-between items-center mb-4 text-sm">
                      <span className="font-semibold text-primary">{article.publication}</span>
                      <span className="text-muted-foreground">{article.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {article.excerpt}
                    </p>

                    {/* Read More Button */}
                    <Button asChild className="w-full">
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        Read Article
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action for More Press */}
          <motion.div
            className="mt-16 text-center p-8 bg-accent/30 rounded-lg"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">
              Want to Cover Our Story?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              We welcome press inquiries about Start Where We Are Festival, our mission to combine music with sustainability,
              and our grassroots community approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="mailto:startwherewearefestival@gmail.com">
                  Contact for Press
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}