import { track } from '@vercel/analytics/server'

// Simple analytics wrapper
export const trackServerEvent = (eventName: string, properties?: Record<string, any>) => {
  try {
    track(eventName, properties)
  } catch (error) {
    console.log('Analytics event:', eventName, properties)
  }
}
