import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './testSetup.js',
	},
	server: {
		host: true,
		port: 5173,
		allowedHosts: ['bloglist-frontend'],
		proxy: {
			"/api": {
				target: "http://localhost:3003",
				changeOrigin: true,
			},
		},
	},
})