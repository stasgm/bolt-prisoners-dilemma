/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
	output: "export",
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		unoptimized: true,
	},
};

export default nextConfig;
