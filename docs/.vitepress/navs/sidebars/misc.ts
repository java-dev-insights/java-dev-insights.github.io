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
          { text: 'Images', link: PATHS.MISC_INDEX+'utils/images' },
          { text: 'Youtube', link: PATHS.MISC_INDEX+'utils/youtube' },
          { text: 'Mermaid', link: PATHS.MISC_INDEX+'utils/mermaid' },
          { text: 'Maths', link: PATHS.MISC_INDEX+'utils/maths' },
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: PATHS.MISC_INDEX+'examples/markdown-examples' },
          { text: 'Runtime API Examples', link: PATHS.MISC_INDEX+'examples/api-examples' },
        ]
      },
    ]

export default SIDEBAR_MISC_DEFAULT;