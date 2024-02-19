/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  experimental: {
    appDir: true
  },
  images: {
    domains: ["links.paperreacr.com", "unsplash.com", "images.unsplash.com", "cdn.sanity.io"],
  }
}
