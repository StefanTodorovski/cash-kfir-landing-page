import { ENV } from '../config/environment';

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

  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this.initializeGoogleAnalytics();
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

  /**
   * Log a custom event to Google Analytics
   * @param eventName - The name of the event
   * @param params - Additional parameters for the event
   */
  logEvent(eventName: string, params?: { [key: string]: any }): void {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        app_name: 'morningful_landing_page',
        ...params,
      });
    } else if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventName, params);
    }
  }

  /**
   * Log a page view to Google Analytics
   * @param path - The page path
   * @param title - Optional page title
   */
  logPageView(path: string, title?: string): void {
    if (typeof window.gtag === 'function') {
      window.gtag('config', this.trackingId, {
        page_path: path,
        page_title: title,
        app_name: 'morningful_landing_page',
      });
    } else if (process.env.NODE_ENV === 'development') {
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
