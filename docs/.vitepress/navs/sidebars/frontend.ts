import { default as PATHS } from '../paths';

const SIDEBAR_DEFAULT_FRONTEND = [
      { text: 'Overview', link: PATHS.FRONTEND_INDEX },
      {
        text: 'Basic',
        items: [
          { text: 'HTML', link: PATHS.FRONTEND_INDEX+'html' },
          { text: 'CSS', link: PATHS.FRONTEND_INDEX+'css' },
          { text: 'Javascript', link: PATHS.FRONTEND_INDEX+'js/' },
        ]
      },
      {
        text: 'Libs & Preprocessors',
        items: [
          { text: 'Bootstrap', link: PATHS.FRONTEND_INDEX+'bs' },
          { text: 'Sass', link: PATHS.FRONTEND_INDEX+'sass' },
          { text: 'Typescript', link: PATHS.FRONTEND_INDEX+'ts' },
        ]
      },
      {
        text: 'Frameworks',
        items: [
          { text: 'Vue3', link: PATHS.FRONTEND_INDEX+'vue' },
          { text: 'Angular', link: PATHS.FRONTEND_INDEX+'angular/' },
        ]
      },
      {
        text: 'Testing',
        items: [
          { text: 'Jest', link: PATHS.FRONTEND_INDEX+'jest' },
          { text: 'Vue Test Utils', link: PATHS.FRONTEND_INDEX+'vue-test-utils' },
          { text: 'Vue Test (external)', link: 'https://test-utils.vuejs.org/guide/' },
        ]
      },
      {
        text: 'Module Bundler',
        items: [
          { text: 'Vite', link: PATHS.FRONTEND_INDEX+'vite' },
          { text: 'Webpack', link: PATHS.FRONTEND_INDEX+'webpack' },
        ]
      },
    ]

export default SIDEBAR_DEFAULT_FRONTEND;
