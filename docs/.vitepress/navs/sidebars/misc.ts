import { default as PATHS } from '../paths';

const SIDEBAR_MISC_DEFAULT = [
      { text: 'Overview', link: PATHS.MISC_INDEX },
      {
        text: 'Miscellaneous',
        items: [
          { text: 'References', link: PATHS.MISC_REFS },
          { text: 'Jekyll', link: PATHS.MISC_JEKYLL },
          { text: 'temp', link: PATHS.MISC_TEMP },
        ]
      },
      {
        text: 'Utils',
        items: [
          { text: 'Images', link: PATHS.MISC_UTILS+'images' },
          { text: 'Youtube', link: PATHS.MISC_UTILS+'youtube' },
          { text: 'Mermaid', link: PATHS.MISC_UTILS+'mermaid' },
          { text: 'Maths', link: PATHS.MISC_UTILS+'maths' },
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: PATHS.MISC_EXAMPLES+'markdown-examples' },
          { text: 'Runtime API Examples', link: PATHS.MISC_EXAMPLES+'api-examples' },
        ]
      },
    ]

export default SIDEBAR_MISC_DEFAULT;