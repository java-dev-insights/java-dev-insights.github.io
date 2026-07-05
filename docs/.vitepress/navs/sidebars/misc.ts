import { default as PATHS } from '../paths';

const SIDEBAR_MISC_DEFAULT = [
      { text: 'Overview', link: PATHS.MISC_INDEX },
      {
        text: 'Miscellaneous',
        items: [
          { text: 'Jekyll', link: PATHS.MISC_JEKYLL },
          { text: 'Chrome', link: PATHS.MISC_CHROME },
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: PATHS.MISC_MARKDOWN_EXAMPLES },
          { text: 'Runtime API Examples', link: PATHS.MISC_API_EXAMPLES },
        ]
      },
      {
        text: 'Others',
        items: [
          { text: 'References', link: PATHS.MISC_REFS },
          { text: 'Elements', link: '/misc/elements' },
        ]
      },
    ]

export default SIDEBAR_MISC_DEFAULT;