import { defineConfig } from 'vitepress';
import { vitepressMermaidPreview } from 'vitepress-mermaid-preview';
import TOP_NAVBAR from "./navs/navbar";
import ALL_SIDEBARS from './navs/sidebar';

// Check if the build environment is GitHub Actions
const IS_GITHUB_ACTIONS = process.env.GITHUB_ACTIONS === 'true';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "java-dev-insights",
  description: "java-dev-insights",
  // Use repository name for GitHub Pages, fallback to root '/' for Netlify
  base: IS_GITHUB_ACTIONS ? '/' : '/',
  cleanUrls: true,
  ignoreDeadLinks: true,
  srcDir: "./src",
  head: [
		["link", { rel: "icon", href: "icons/favicon.ico" }],
		["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
		["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: '' }],
		["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bungee&display=swap" }],
	],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: TOP_NAVBAR,
    sidebar: ALL_SIDEBARS,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: { provider: 'local' },
		// TODO: Agolia AI search
  },
  markdown: {
    math: true,
    config: (md) => {
      vitepressMermaidPreview(md, {
        showToolbar: false, // Global setting: whether to show toolbar by default
      });
    },
  },
})
