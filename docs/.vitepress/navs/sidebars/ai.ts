import { default as PATHS } from '../paths';

const SIDEBAR_DEFAULT_AI = [
      { text: 'Overview', link: PATHS.AI_INDEX },
      {
        // text: 'Examples',
        items: [
          { text: 'Introduction', link: PATHS.AI_INDEX+'intro' },
        ]
      },
    ]

export default SIDEBAR_DEFAULT_AI;