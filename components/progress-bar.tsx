'use client';

import { useEffect, useState } from 'react';

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
  const [progress, setProgress] = useState(currentValue);
  const [loading, setLoading] = useState(false);
  const [campaignData, setCampaignData] = useState<any>(null);

  useEffect(() => {
    if (apiEndpoint || campaignId) {
      fetchProgress();
    }
  }, [apiEndpoint, campaignId]);

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

  const progressPercentage = Math.min(Math.max(progress, 0), 100);

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
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">
          {loading ? (
            <span className="opacity-50">Loading...</span>
          ) : (
            `${Math.round(progressPercentage)}%`
          )}
        </span>
      </div>
      <div className="relative w-full h-4 bg-muted rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progressPercentage}%` }}
        >
          {!loading && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
        </div>
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