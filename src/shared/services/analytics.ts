import { ENV } from '../config/environment';
import mixpanel from 'mixpanel-browser';

// Google Analytics types
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

class AnalyticsService {
  private trackingId: string = ENV.GOOGLE_ANALYTICS_ID;
  private isInitialized: boolean = false;
  private isMixpanelInitialized: boolean = false;
  private isCountryBlocked: boolean = false;

  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this.initializeGoogleAnalytics();
      this.initializeMixpanel();
    }
  }

  private initializeGoogleAnalytics(): void {
    if (this.isInitialized) return;

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    // Inject Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${this.trackingId}`;
    document.head.appendChild(script1);

    // Initialize gtag function
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${this.trackingId}');
    `;
    document.head.appendChild(script2);

    this.isInitialized = true;
  }

  private async initializeMixpanel(): Promise<void> {
    if (this.isMixpanelInitialized) return;

    try {
      // Check if user's country is blocked
      const isBlocked = await this.isUserCountryBlocked();
      this.isCountryBlocked = isBlocked;

      if (!isBlocked) {
        // Initialize Mixpanel only if country is not blocked
        mixpanel.init(ENV.MIXPANEL_TOKEN, {
          debug: process.env.NODE_ENV === 'development',
          track_pageview: true,
          persistence: 'localStorage',
          property_blacklist: ['$current_url', '$initial_referrer', '$referrer']
        });
        
        this.isMixpanelInitialized = true;
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Mixpanel initialized successfully');
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.log('Mixpanel blocked for this country');
        }
      }
    } catch (error) {
      console.error('Failed to initialize Mixpanel:', error);
    }
  }

  private async isUserCountryBlocked(): Promise<boolean> {
    try {
      // Use a simple IP geolocation service to get user's country
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const userCountry = data.country_code;
      
      const isBlocked = ENV.MIXPANEL_BLOCKED_COUNTRIES.includes(userCountry);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`User country: ${userCountry}, Blocked: ${isBlocked}`);
      }
      
      return isBlocked;
    } catch (error) {
      // If geolocation fails, allow tracking (fail open)
      console.warn('Could not determine user country, allowing tracking:', error);
      return false;
    }
  }

  /**
   * Log a custom event to Google Analytics and Mixpanel
   * @param eventName - The name of the event
   * @param params - Additional parameters for the event
   */
  logEvent(eventName: string, params?: { [key: string]: any }): void {
    // Google Analytics tracking
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        app_name: 'morningful_landing_page',
        ...params,
      });
    }

    // Mixpanel tracking (only if not blocked)
    if (this.isMixpanelInitialized && !this.isCountryBlocked) {
      mixpanel.track(eventName, {
        app_name: 'morningful_landing_page',
        ...params,
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventName, params);
    }
  }

  /**
   * Log a page view to Google Analytics and Mixpanel
   * @param path - The page path
   * @param title - Optional page title
   */
  logPageView(path: string, title?: string): void {
    // Google Analytics tracking
    if (typeof window.gtag === 'function') {
      window.gtag('config', this.trackingId, {
        page_path: path,
        page_title: title,
        app_name: 'morningful_landing_page',
      });
    }

    // Mixpanel tracking (only if not blocked)
    if (this.isMixpanelInitialized && !this.isCountryBlocked) {
      mixpanel.track('Page View', {
        page_path: path,
        page_title: title,
        app_name: 'morningful_landing_page',
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Page View:', path, title);
    }
  }

  /**
   * Track demo request submissions
   */
  trackDemoRequest(formData: any): void {
    this.logEvent('demo_request_submitted', {
      event_category: 'engagement',
      event_label: 'landing_page_form',
      value: 1,
      custom_parameters: {
        company: formData.company || 'unknown',
        email_domain: formData.email?.split('@')[1] || 'unknown',
      },
    });
  }

  /**
   * Track CTA button clicks
   */
  trackCTAClick(buttonText: string, section: string): void {
    this.logEvent('cta_button_click', {
      event_category: 'engagement',
      event_label: buttonText,
      custom_parameters: {
        section: section,
        button_text: buttonText,
      },
    });
  }

  /**
   * Track navigation interactions
   */
  trackNavigation(item: string): void {
    this.logEvent('navigation_click', {
      event_category: 'navigation',
      event_label: item,
      custom_parameters: {
        navigation_item: item,
      },
    });
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(percentage: number): void {
    this.logEvent('scroll_depth', {
      event_category: 'engagement',
      event_label: `${percentage}%`,
      value: percentage,
    });
  }

  /**
   * Track feature interactions
   */
  trackFeatureInteraction(feature: string, action: string): void {
    this.logEvent('feature_interaction', {
      event_category: 'features',
      event_label: `${feature}_${action}`,
      custom_parameters: {
        feature_name: feature,
        interaction_type: action,
      },
    });
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();
