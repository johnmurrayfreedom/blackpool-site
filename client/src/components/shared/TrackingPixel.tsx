import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

interface TrackingPixelProps {
  pageType: string;
  pageName: string;
  category?: string;
  action?: string;
}

/**
 * Silent tracking component for tracking page views and resource access
 * Used to improve analytics on user engagement with different resources
 */
export default function TrackingPixel({
  pageType,
  pageName,
  category = 'page_view',
  action = 'view'
}: TrackingPixelProps) {
  useEffect(() => {
    // Track the page view or resource access using Google Analytics
    trackEvent(action, category, pageName);
    
    // Optional: Track page view on server side if needed
    // Uncomment and use if you need server-side tracking
    /*
    fetch('/api/track/pageview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page: window.location.pathname,
        pageName,
        pageType,
        referrer: document.referrer,
      }),
    }).catch(error => {
      console.error('Error tracking page view:', error);
    });
    */
  }, [action, category, pageName, pageType]);

  // This component doesn't render anything visual
  return null;
}