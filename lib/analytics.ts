// Cloudflare Analytics Engine service for comprehensive event tracking
// Keeps D1 clean while tracking detailed analytics

export interface ClickEventData {
  // Client-provided data
  screenWidth?: number;
  screenHeight?: number;
  clickX?: number;
  clickY?: number;
  timeOnPage?: number;
  sessionId?: string;

  // Server will add these
  timestamp?: number;
}

export interface AnalyticsEvent {
  // Geographic
  country?: string;
  city?: string;
  region?: string;
  timezone?: string;
  latitude?: string;
  longitude?: string;
  postalCode?: string;

  // Network
  asn?: string;
  asOrganization?: string;
  colo?: string; // Cloudflare datacenter

  // Device/Browser (parsed from User-Agent)
  userAgent?: string;
  referer?: string;

  // Behavior
  screenWidth?: number;
  screenHeight?: number;
  clickX?: number;
  clickY?: number;
  timeOnPage?: number;
  sessionId?: string;

  // Technical
  httpProtocol?: string;
  tlsVersion?: string;

  // Metadata
  timestamp: number;
  eventType: string; // 'click', 'view', etc.
}

export class AnalyticsService {
  constructor(
    private analytics: AnalyticsEngineDataset,
    private request: Request,
    private cf?: IncomingRequestCfProperties
  ) {}

  /**
   * Track a click event with comprehensive data
   */
  async trackClick(clientData: ClickEventData): Promise<void> {
    const event = this.buildEvent('click', clientData);
    await this.writeEvent(event);
  }

  /**
   * Build a comprehensive event object from request + client data
   */
  private buildEvent(eventType: string, clientData: ClickEventData): AnalyticsEvent {

    // Parse headers
    const userAgent = this.request.headers.get('user-agent') || undefined;
    const referer = this.request.headers.get('referer') || undefined;

    return {
      // Geographic data from Cloudflare
      country: this.cf?.country,
      city: this.cf?.city,
      region: this.cf?.region,
      timezone: this.cf?.timezone,
      latitude: this.cf?.latitude,
      longitude: this.cf?.longitude,
      postalCode: this.cf?.postalCode,

      // Network data
      asn: this.cf?.asn?.toString(),
      asOrganization: this.cf?.asOrganization,
      colo: this.cf?.colo,

      // Device/Browser
      userAgent,
      referer,

      // Client behavior data
      screenWidth: clientData.screenWidth,
      screenHeight: clientData.screenHeight,
      clickX: clientData.clickX,
      clickY: clientData.clickY,
      timeOnPage: clientData.timeOnPage,
      sessionId: clientData.sessionId,

      // Technical
      httpProtocol: this.cf?.httpProtocol,
      tlsVersion: this.cf?.tlsVersion,

      // Metadata
      timestamp: Date.now(),
      eventType,
    };
  }

  /**
   * Write event to Analytics Engine
   */
  private async writeEvent(event: AnalyticsEvent): Promise<void> {
    try {
      // Analytics Engine uses writeDataPoint
      this.analytics.writeDataPoint({
        blobs: [
          event.country || '',
          event.city || '',
          event.region || '',
          event.timezone || '',
          event.colo || '',
          event.asOrganization || '',
          event.userAgent || '',
          event.referer || '',
          event.httpProtocol || '',
          event.tlsVersion || '',
          event.sessionId || '',
          event.eventType,
        ],
        doubles: [
          event.screenWidth || 0,
          event.screenHeight || 0,
          event.clickX || 0,
          event.clickY || 0,
          event.timeOnPage || 0,
          parseFloat(event.latitude || '0'),
          parseFloat(event.longitude || '0'),
        ],
        indexes: [event.sessionId || ''], // Can query by session
      });
    } catch (error) {
      // Don't fail the request if analytics fails
      console.error('Analytics tracking failed:', error);
    }
  }
}

/**
 * Factory function to create analytics service
 */
export function createAnalyticsService(
  analytics: AnalyticsEngineDataset | undefined,
  request: Request,
  cf?: IncomingRequestCfProperties
): AnalyticsService | null {
  if (!analytics) {
    console.warn('[Analytics] Analytics Engine not available');
    return null;
  }
  return new AnalyticsService(analytics, request, cf);
}
