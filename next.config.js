/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	distDir: '.build',

	webpack(config, context) {
		config.optimization.mergeDuplicateChunks = true;

		return config;
	},
};

module.exports = nextConfig;
