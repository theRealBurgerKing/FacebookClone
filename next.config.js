/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "links.papareact.com",
      "platform-lookaside.fbsbx.com",
      "firebasestorage.googleapis.com",
      'scontent.fsyd12-1.fna.fbcdn.net'
    ],
  },
}

module.exports = nextConfig