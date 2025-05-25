// @ts-check

/** @type {import('next').NextConfig} **/
const NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true
  },
  // Custom server configuration for local development
  serverRuntimeConfig: {
    port: 9090,
    hostname: 'localhost'
  },
  // Make Next.js listen only on localhost instead of all interfaces
  hostname: 'localhost',
  port: 9090
}

module.exports = NextConfig
