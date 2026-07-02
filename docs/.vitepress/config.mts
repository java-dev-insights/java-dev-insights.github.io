import { defineConfig } from 'vitepress';
import { vitepressMermaidPreview } from 'vitepress-mermaid-preview';

// Check if the build environment is GitHub Actions
const IS_GITHUB_ACTIONS = process.env.GITHUB_ACTIONS === 'true';

const defaultTopNav = [
      { text: 'Home', link: '/' },
      { text: 'Setup', link: '/setup' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'Utils', items: [
                          { text: 'Images', link: '/utils/images' },
                          { text: 'Youtube', link: '/utils/youtube' },
                          { text: 'Mermaid', link: '/utils/mermaid' },
                          { text: 'Maths', link: '/utils/maths' },
                        ]
      },
    ];

const sidebarDefault = [
      {
        collapsed: true,
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ];

const sidebarUtils = [
  { 
    collapsed: true,
    text: 'Media', 
    items: [
      { text: 'Images', link: '/utils/images' },
      { text: 'Youtube', link: '/utils/youtube' },
    ] 
  },
  { 
    collapsed: true,
    text: 'Diagrams', 
    items: [
      { text: 'Mermaid', link: '/utils/mermaid' },
      { text: 'Maths', link: '/utils/maths' },
    ] 
  }
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "template-vitepress",
  description: "template-vitepress",
  // Use repository name for GitHub Pages, fallback to root '/' for Netlify
  base: IS_GITHUB_ACTIONS ? '/template-vitepress' : '/',
  cleanUrls: true,
  ignoreDeadLinks: true,
  head: [
		["link", { rel: "icon", href: "icons/favicon.ico" }],
		["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
		["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: '' }],
		["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bungee&display=swap" }],
	],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: defaultTopNav,
    sidebar: {
      "/": sidebarDefault,
      "/utils/": sidebarUtils,
    },

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
