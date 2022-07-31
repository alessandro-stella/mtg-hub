/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["c1.scryfall.com", "c2.scryfall.com"],
    },
};

module.exports = nextConfig;
