/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false, // or true, but be consistent with Traefik rewrite rules
    trustHost: true,
};

module.exports = nextConfig;
