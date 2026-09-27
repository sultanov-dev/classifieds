import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react()],
	resolve: {
		tsconfigPaths: true,
	},
	test: {
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.tsx'],
		include: ['test/**/*.test.{ts,tsx}'],
		exclude: ['node_modules', '.next', 'e2e'],
		env: {
			API_URL: 'http://localhost:4000',
		},
		server: {
			deps: {
				inline: ['next-intl'],
			},
		},
		// har testdan oldin vi.fn() chaqiruvlar tarixini tozalaydi
		clearMocks: true,
		restoreMocks: true,
		coverage: {
			provider: 'v8',
			include: [
				'lib/**',
				'hooks/**',
				'store/**',
				'validation/**',
				'api/**',
				'components/**',
				'shared/**',
			],
			exclude: ['components/ui/**'],
		},
	},
})
