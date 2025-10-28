'use client'

import { useEffect } from 'react';
import { initializeTracking } from '@/lib/analytics';

export default function AnalyticsTracker() {
  useEffect(() => {
    // Initialize tracking when component mounts
    initializeTracking();
  }, []);

  // This component renders nothing, it just runs the tracking
  return null;
}