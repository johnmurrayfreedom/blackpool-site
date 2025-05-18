import { useEffect } from 'react';

export default function GoogleTagManager() {
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    
    if (!measurementId) {
      console.warn('Missing required Google Analytics measurement ID');
      return;
    }
    
    // Create and add Google Analytics script tags
    const gtagScript1 = document.createElement('script');
    gtagScript1.async = true;
    gtagScript1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(gtagScript1);

    const gtagScript2 = document.createElement('script');
    gtagScript2.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    `;
    document.head.appendChild(gtagScript2);

    // Clean up function
    return () => {
      try {
        document.head.removeChild(gtagScript1);
        document.head.removeChild(gtagScript2);
      } catch (e) {
        // Elements might have been removed already
      }
    };
  }, []);

  return null; // This component doesn't render anything
}