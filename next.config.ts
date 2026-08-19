import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				pathname: '/uploads/**',
			},
		],
		dangerouslyAllowLocalIP: isDev,
	},
}

export default nextConfig
