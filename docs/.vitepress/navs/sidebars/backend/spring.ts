import { default as PATHS } from "../../paths";

const SIDEBAR_SPRING = [
      { text: 'Spring Framework', link: PATHS.BACKEND_SPRING },
      {
        text: 'Spring Core',
        collapsed: true,
        items: [
          { text: 'Introduction', link: (PATHS.BACKEND_SPRING+'/core') },
        ]
      },
      {
        text: 'Spring Web',
        collapsed: true,
        items: [
          { text: 'Introduction', link: (PATHS.BACKEND_SPRING+'/web') },
        ]
      },
      {
        text: 'Spring Data',
        collapsed: true,
        items: [
          { text: 'Introduction', link: (PATHS.BACKEND_SPRING+'/data') },
        ]
      },
      {
        text: 'Spring Security',
        collapsed: true,
        items: [
          { text: 'Introduction', link: (PATHS.BACKEND_SPRING+'/security') },
        ]
      },
    ]

export default SIDEBAR_SPRING;