import { default as PATHS } from '../paths';

const SIDEBAR_DEFAULT_AI = [
      { text: 'Overview', link: PATHS.AI_INDEX },
      {
        // text: 'Examples',
        items: [
          { text: 'Introduction', link: PATHS.AI_INTRO },
        ]
      },
    ]

export default SIDEBAR_DEFAULT_AI;