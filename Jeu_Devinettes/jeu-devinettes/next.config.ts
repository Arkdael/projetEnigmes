import type { NextConfig } from "next";
import { paraglideWebpackPlugin } from "@inlang/paraglide-js";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {},
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'fr',
  },
  webpack: (config) => {
    config.plugins.push(
		paraglideWebpackPlugin({
			outdir: "./src/paraglide",
			project: "./project.inlang",
			strategy: ["url", "baseLocale"]
		})
	  );
		return config;
	},
};

export default nextConfig;
