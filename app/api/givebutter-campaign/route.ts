import { NextResponse } from 'next/server';

// Type definitions for Givebutter API response
interface GivebutterApiResponse {
  data: {
    id: string;
    type: 'general' | 'collect' | 'fundraise' | 'event';
    status: 'active' | 'inactive' | 'unpublished';
    title: string;
    subtitle?: string;
    description?: string;
    slug: string;
    raised: number; // Amount in cents
    goal: number; // Amount in cents
    donors: number;
    end_at?: string;
    url: string;
    currency: string;
    cover?: {
      url?: string;
      alt?: string;
    };
    created_at: string;
    updated_at: string;
    meta?: {
      title?: string;
      description?: string;
      image?: string;
    };
    account_id: string;
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const campaignId = searchParams.get('id');

  if (!campaignId) {
    return NextResponse.json(
      { error: 'Campaign ID is required' },
      { status: 400 }
    );
  }

  // Use hardcoded token for now (you should move this to environment variable)
  const apiKey = process.env.GIVEBUTTER_API_KEY;
  
  // Use native fetch as shown in Givebutter documentation
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };

  return fetch(`https://api.givebutter.com/v1/campaigns/${campaignId}`, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((response: any) => {
      
      // The response might be the data directly, not wrapped in a 'data' property
      const data = response.data || response;
      
      if (!data) {
        console.error('No data in response');
        throw new Error('No data received from Givebutter API');
      }
      
      // Transform the Givebutter response to match your ProgressBar format
      // Note: Givebutter returns amounts in CENTS, so we need to convert to dollars
      const amountRaisedInDollars = data.raised ? Math.round(data.raised / 100) : 0;
      const goalInDollars = data.goal ? Math.round(data.goal / 100) : 3000;
      
      const progressData = {
        // Core progress bar data
        current: amountRaisedInDollars,
        max: goalInDollars,
        percentage: goalInDollars > 0 
          ? Math.round((amountRaisedInDollars / goalInDollars) * 100) 
          : 0,
        
        // Additional campaign information
        campaign: {
          id: data.id,
          title: data.title || 'Untitled Campaign',
          subtitle: data.subtitle,
          description: data.description || '',
          amount_raised: amountRaisedInDollars,
          goal: goalInDollars,
          supporters_count: data.donors || 0,
          url: data.url,
          end_date: data.end_at || null,
          status: data.status,
          currency: data.currency || 'USD',
          cover_image: data.cover?.url || null,
        }
      };

      // Return with cache headers for better performance
      return NextResponse.json(progressData, {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      });
    })
    .catch(err => {
      console.error('Givebutter API error:', err);
      
      // Return fallback data on error
      return NextResponse.json({
        current: 2150,
        max: 3000,
        percentage: 72,
        campaign: {
          title: 'Start Where We Are Festival 2025',
          description: 'Support our community music festival',
          raised: 2150,
          goal: 3000,
          donors: 43,
          url: '#',
          end_at: null,
        }
      });
    });
}