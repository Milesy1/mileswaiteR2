/**
 * Bundle Analyzer Configuration
 * 
 * Usage:
 *   ANALYZE=true npm run build
 * 
 * This will generate bundle analysis reports in .next/analyze/
 */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = require('./next.config.js');

module.exports = withBundleAnalyzer(nextConfig);

