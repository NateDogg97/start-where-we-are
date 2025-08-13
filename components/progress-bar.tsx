'use client';

import { useEffect, useState } from 'react';

interface ProgressBarProps {
  apiEndpoint?: string;
  maxValue?: number;
  currentValue?: number;
  label?: string;
}

export function ProgressBar({ 
  apiEndpoint, 
  maxValue = 100, 
  currentValue = 0,
  label = "Tickets Sold"
}: ProgressBarProps) {
  const [progress, setProgress] = useState(currentValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (apiEndpoint) {
      fetchProgress();
    }
  }, [apiEndpoint]);

  const fetchProgress = async () => {
    if (!apiEndpoint) return;
    
    setLoading(true);
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      // Assuming the API returns { current: number, max: number }
      const percentage = (data.current / data.max) * 100;
      setProgress(percentage);
    } catch (error) {
      console.error('Error fetching progress:', error);
      // Fallback to passed prop or default
      setProgress(currentValue);
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{Math.round(progressPercentage)}%</span>
      </div>
      <div className="relative w-full h-4 bg-muted rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>
    </div>
  );
}