import { default as PATHS } from '../paths';

const SIDEBAR_DEFAULT_FRONTEND = [
      { text: 'Overview', link: PATHS.FRONTEND_INDEX },
      {
        text: 'Basic',
        items: [
          { text: 'HTML', link: PATHS.FRONTEND_HTML },
          { text: 'CSS', link: PATHS.FRONTEND_CSS },
          { text: 'Javascript', link: PATHS.FRONTEND_JS },
        ]
      },
      {
        text: 'Libs & Preprocessors',
        items: [
          { text: 'Bootstrap', link: PATHS.FRONTEND_BOOTSTRAP },
          { text: 'Sass', link: PATHS.FRONTEND_SASS },
          { text: 'Typescript', link: PATHS.FRONTEND_TS },
        ]
      },
      {
        text: 'Frameworks',
        items: [
          { text: 'Vue3', link: PATHS.FRONTEND_VUE },
          { text: 'Angular', link: PATHS.FRONTEND_ANGULAR },
        ]
      },
      {
        text: 'Testing',
        items: [
          { text: 'Jest', link: PATHS.FRONTEND_JEST },
          { text: 'Vue Test Utils', link: PATHS.FRONTEND_VTU },
          { text: 'Vue Test (external)', link: 'https://test-utils.vuejs.org/guide/' },
        ]
      },
      {
        text: 'Module Bundler',
        items: [
          { text: 'Vite', link: PATHS.FRONTEND_VITE },
          { text: 'Webpack', link: PATHS.FRONTEND_WEBPACK },
        ]
      },
    ]

export default SIDEBAR_DEFAULT_FRONTEND;
