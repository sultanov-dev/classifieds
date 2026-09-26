import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	retries: process.env.CI ? 2 : 0,
	reporter: process.env.CI ? 'github' : 'html',
	use: {
		baseURL: 'http://localhost:3000',
		locale: 'uz-UZ',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: process.env.CI ? 'bun run build && bun run start' : 'bun run dev',
		url: 'http://localhost:3000/uz',
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
})
