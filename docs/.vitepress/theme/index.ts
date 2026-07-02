// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { initComponent } from 'vitepress-mermaid-preview/component';
import 'vitepress-mermaid-preview/dist/index.css';
import { YouTubeEmbed } from '@miletorix/vitepress-youtube-embed';
import '@miletorix/vitepress-youtube-embed/style.css';
import './style.css';
import ImageComponent from '../../components/ImageComponent.vue';
import NotFound from '../../components/NotFound.vue';
import AsideElementComponent from '../../components/AsideElementComponent.vue';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'not-found': () => h(NotFound),
      // 'aside-outline-before': () => h(AsideElementComponent, {text: 'aside-outline-before'}),
      // 'aside-ads-before': () => h(AsideElementComponent, {text: 'aside-ads-before'}),
      // 'aside-ads-after': () => h(AsideElementComponent, {text: 'aside-ads-after'}),
      // 'aside-bottom': () => h(AsideElementComponent),
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('YouTubeEmbed', YouTubeEmbed);
    app.component('ImageComponent', ImageComponent);
    initComponent(app);
  }
} satisfies Theme
