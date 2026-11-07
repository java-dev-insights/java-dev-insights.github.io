import { default as PATHS } from '../../paths';

const SIDEBAR_DEFAULT_AI = [
      { text: 'Overview', link: PATHS.AI_INDEX },
      {
        // text: 'Examples',
        items: [
          { text: 'Introduction', link: PATHS.AI_INDEX+'intro' },
          { text: 'MCP', link: PATHS.AI_INDEX+'mcp' },
        ]
      },{
        text: 'Claude',
        items: [
          { text: 'Introduction', link: PATHS.AI_INDEX+'claude/' },
          { text: 'Claude Code', link: PATHS.AI_INDEX+'claude/code' },
        ]
      },
    ]

export default SIDEBAR_DEFAULT_AI;