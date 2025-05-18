// Page view tracking utility for Citizens Information & Advice Bureau website
// This module helps track user interactions across the site

import { trackEvent } from './analytics';

// Track resource access
export const trackResourceAccess = (
  resourceType: string,
  resourceName: string,
  resourceCategory?: string
) => {
  trackEvent('resource_access', resourceType, resourceName);
  
  // If user has given email previously, record this interaction server-side
  const userEmail = localStorage.getItem('user_email');
  if (userEmail) {
    fetch('/api/track/pageview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        page: window.location.pathname,
        referrer: document.referrer,
      }),
    }).catch(error => {
      console.error('Error tracking page view:', error);
    });
  }
};

// Store email temporarily for tracking purposes
export const storeUserEmail = (email: string) => {
  if (email && email.includes('@')) {
    localStorage.setItem('user_email', email);
  }
};

// Clear stored email (e.g., for GDPR compliance)
export const clearUserData = () => {
  localStorage.removeItem('user_email');
};