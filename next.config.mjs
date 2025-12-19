
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
        ],
    },
    async redirects() {
        return [
            {
                source: '/blog',
                destination: '/',
                permanent: true,
            },
            {
                source: '/blogs',
                destination: '/',
                permanent: true,
            },
            {
                source: '/tool',
                destination: '/',
                permanent: true,
            },
            {
                source: '/tools',
                destination: '/',
                permanent: true,
            },
        ];
    },
    output: 'export',
};

export default nextConfig;
