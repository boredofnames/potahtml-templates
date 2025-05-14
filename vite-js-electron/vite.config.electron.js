import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'
import { resolve } from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import nodeStdlibBrowser from 'vite-plugin-node-stdlib-browser'

export default defineConfig({
	base: resolve(__dirname, './dist'),
	plugins: [
		babel({
			babelConfig: {
				presets: [['pota/babel-preset', { lib: 'solid' }]],
			},
		}),
		nodePolyfills({ protocolImports: true }),
		nodeStdlibBrowser(),
	],
	server: {
		host: '127.0.0.1',
		port: 1339,
		open: '/',
	},
	build: {
		target: 'esnext',
	},
	optimizeDeps: {
		//disabled: true,
		include: ['prismjs'],
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			'@assets': resolve(__dirname, 'src/assets'),
			'@js': resolve(__dirname, 'src/js'),
			'@lib': resolve(__dirname, 'src/lib'),
			'@comp': resolve(__dirname, 'src/components'),
		},
	},
})
