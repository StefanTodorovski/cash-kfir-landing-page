import { useEffect, useCallback } from 'react';
import { analyticsService } from '../services/analytics';

/**
 * Hook for Google Analytics integration
 * Automatically tracks page views and provides event logging functions
 */
export const useAnalytics = () => {
  // Track page view on mount
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentTitle = document.title;
    analyticsService.logPageView(currentPath, currentTitle);
  }, []);

  // Memoized event logging functions
  const logEvent = useCallback((eventName: string, params?: { [key: string]: any }) => {
    analyticsService.logEvent(eventName, params);
  }, []);

  const logPageView = useCallback((path: string, title?: string) => {
    analyticsService.logPageView(path, title);
  }, []);

  const trackDemoRequest = useCallback((formData: any) => {
    analyticsService.trackDemoRequest(formData);
  }, []);

  const trackCTAClick = useCallback((buttonText: string, section: string) => {
    analyticsService.trackCTAClick(buttonText, section);
  }, []);

  const trackNavigation = useCallback((item: string) => {
    analyticsService.trackNavigation(item);
  }, []);

  const trackScrollDepth = useCallback((percentage: number) => {
    analyticsService.trackScrollDepth(percentage);
  }, []);

  const trackFeatureInteraction = useCallback((feature: string, action: string) => {
    analyticsService.trackFeatureInteraction(feature, action);
  }, []);

  return {
    logEvent,
    logPageView,
    trackDemoRequest,
    trackCTAClick,
    trackNavigation,
    trackScrollDepth,
    trackFeatureInteraction,
  };
};

/**
 * Hook for tracking scroll depth
 * Automatically tracks when user scrolls to 25%, 50%, 75%, and 100% of the page
 */
export const useScrollTracking = () => {
  const { trackScrollDepth } = useAnalytics();

  useEffect(() => {
    const trackedDepths = new Set<number>();
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
      
      // Track at 25%, 50%, 75%, and 100%
      const milestones = [25, 50, 75, 100];
      
      for (const milestone of milestones) {
        if (scrollPercentage >= milestone && !trackedDepths.has(milestone)) {
          trackedDepths.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [trackScrollDepth]);
};
