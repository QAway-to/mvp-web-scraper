// Adapter registry for site-specific scrapers
// This module provides a fallback when no specific adapter is found

/**
 * Find an adapter for the given URL
 * Returns null if no specific adapter matches (uses fallback logic in scraper_core)
 * @param {string} url - The URL to find an adapter for
 * @returns {object|null} - Adapter object or null
 */
export function findAdapter(url) {
    // No specific adapters registered - return null to use fallback
    return null;
}

/**
 * Register adapters here as needed
 * Example adapter structure:
 * {
 *   name: 'example-adapter',
 *   match: (url) => url.includes('example.com'),
 *   expandUrl: async (url, fetcher, options) => [...urls],
 *   parsePage: async (html, url) => [...rows]
 * }
 */
export const adapters = [];
