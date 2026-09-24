import type { NextConfig } from 'next'
import createaNextIntlPlugin from 'next-intl/plugin'

const isDev = process.env.NODE_ENV === 'development'
const withNextIntl = createaNextIntlPlugin()

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

export default withNextIntl(nextConfig)
