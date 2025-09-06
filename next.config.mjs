
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.postimg.cc',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '/**',
            }
        ],
    },
     // Required for Genkit to work with Next.js App Router
    // See: https://firebase.google.com/docs/genkit/nextjs-app-router#add_a_next.config.js_file
    experimental: {
        instrumentationHook: true,
    }
};

export default nextConfig;
