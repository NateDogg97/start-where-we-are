'use client';

import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ProgressBarProps {
  apiEndpoint?: string;
  maxValue?: number;
  currentValue?: number;
  label?: string;
  campaignId?: string;
}

export function ProgressBar({ 
  apiEndpoint, 
  maxValue = 3000, 
  currentValue = 0,
  label = "Tickets Sold",
  campaignId
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [campaignData, setCampaignData] = useState<any>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (apiEndpoint || campaignId) {
      fetchProgress();
    } else {
      setProgress(currentValue);
    }
  }, [apiEndpoint, campaignId]);

  // Animate progress when in view
  useEffect(() => {
    if (isInView && progress > 0) {
      // Animate from 0 to progress
      const timer = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, progress]);

  const fetchProgress = async () => {
    if (!apiEndpoint && !campaignId) return;
    
    setLoading(true);
    try {
      // Use the custom endpoint if provided, otherwise use Give Butter endpoint
      const url = apiEndpoint || `/api/givebutter-campaign?id=${campaignId}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`Failed to fetch campaign data: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Store campaign data for additional display if needed
      setCampaignData(data.campaign);
      
      // Use percentage if directly provided, otherwise calculate it
      const percentage = data.percentage !== undefined 
        ? data.percentage 
        : (data.current / data.max) * 100;
      
      setProgress(percentage);
    } catch (error) {
      console.error('Error fetching progress:', error);
      // Fallback to passed prop or default
      setProgress(currentValue);
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = Math.min(Math.max(animatedProgress, 0), 100);

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full space-y-2" ref={ref}>
      <motion.div 
        className="flex justify-between text-sm"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-muted-foreground">{label}</span>
        <motion.span 
          className="font-semibold"
          key={progressPercentage}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.3 }}
        >
          {loading ? (
            <span className="opacity-50">Loading...</span>
          ) : (
            `${Math.round(progressPercentage)}%`
          )}
        </motion.span>
      </motion.div>
      <div className="relative w-full h-4 bg-muted rounded-full overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut",
            delay: isInView ? 0.2 : 0
          }}
        >
          {!loading && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
        </motion.div>
      </div>
      {campaignData && campaignData.amount_raised !== undefined && (
        <div className="flex justify-between text-xs text-muted-foreground pt-1">
          <span>{formatCurrency(campaignData.amount_raised)} raised</span>
          {campaignData.goal && (
            <span>Goal: {formatCurrency(campaignData.goal)}</span>
          )}
        </div>
      )}
    </div>
  );
}