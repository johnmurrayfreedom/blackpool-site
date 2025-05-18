import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Hook to scroll to top of the page when the route changes
 */
export function useScrollTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
}