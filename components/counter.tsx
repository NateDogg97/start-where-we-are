'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, motion } from 'framer-motion';

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export function Counter({ 
  from = 0, 
  to, 
  duration = 2,
  suffix = '',
  prefix = ''
}: CounterProps) {
  const ref = useRef(null);
  const motionValue = useMotionValue(from);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const animation = animate(motionValue, to, { 
        duration,
        ease: "easeOut"
      });
      
      return animation.stop;
    }
  }, [isInView, motionValue, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}