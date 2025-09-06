
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
     // Preconnect to Google Fonts for performance
    async headers() {
        return [
        {
            source: '/:path*',
            headers: [
            {
                key: 'Link',
                value: '<https://fonts.gstatic.com>; rel=preconnect',
            },
            ],
        },
        ]
    },
};

export default nextConfig;
