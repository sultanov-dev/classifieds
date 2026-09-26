import react from '@vitejs/plugin-react'
import tsconfigPath from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [tsconfigPath(), react()],
	test: {
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.tsx'],
		include: ['**/*.test.{ts,tsx}'],
		exclude: ['node_modules', '.next', 'e2e'],
		env: {
			API_URL: 'http://localhost:4000',
		},
		server: {
			deps: {
				inline: ['next-intl'],
			},
		},
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
