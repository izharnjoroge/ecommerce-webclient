/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "yoajlftnclxvceabmmul.supabase.co",
          },
        ],
      },
}

module.exports = nextConfig
