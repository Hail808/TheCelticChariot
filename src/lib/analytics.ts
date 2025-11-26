// Unique identifier management
export function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

export function getUserId(): string {
  if (typeof window === 'undefined') return 'server';
  
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('userId', userId);
  }
  return userId;
}

// 🔧 FIX: Track recent page views to prevent duplicates
const recentPageViews = new Set<string>();

// Track page views
export async function trackPageView(
  userId: string,
  sessionId: string,
  productId?: number,
  pageUrl: string = typeof window !== 'undefined' ? window.location.href : ''
) {
  console.log('🔵 trackPageView called with:', { userId, sessionId, productId, pageUrl });
  
  const viewKey = `${userId}_${sessionId}_${productId || 'null'}_${pageUrl}`;
  
  if (recentPageViews.has(viewKey)) {
    console.log('⚠️ Duplicate page view prevented:', viewKey);
    return;
  }
  
  recentPageViews.add(viewKey);
  setTimeout(() => recentPageViews.delete(viewKey), 5000); // Clear after 5 seconds
  
  try {
    const response = await fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        sessionId,
        productId,
        pageUrl,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        referrer: typeof document !== 'undefined' ? document.referrer : ''
      })
    });
    
    const data = await response.json();
    console.log('✅ Tracking response:', data);
  } catch (error) {
    console.error('❌ Failed to track page view:', error);
  }
}

// Track session end
export async function trackSessionEnd(sessionId: string) {
  console.log('🔵 trackSessionEnd called with:', sessionId);
  
  try {
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const data = JSON.stringify({ sessionId });
      const blob = new Blob([data], { type: 'application/json' });
      navigator.sendBeacon('/api/analytics/session-end', blob);
    }
  } catch (error) {
    console.error('❌ Failed to track session end:', error);
  }
}

// Initialize tracking
export function initializeTracking() {
  console.log('🔵 initializeTracking called');
  
  if (typeof window === 'undefined') {
    console.log('⚠️ Window not available (SSR)');
    return;
  }
  
  const userId = getUserId();
  const sessionId = getSessionId();
  
  console.log('🔵 User/Session IDs:', { userId, sessionId });
  
  // Individual pages will call trackPageView manually with proper product IDs
  
  // Track session end on page unload
  window.addEventListener('beforeunload', () => {
    trackSessionEnd(sessionId);
  });
  
  // Track page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      trackSessionEnd(sessionId);
    }
  });
  
  console.log('✅ Tracking initialized');
}