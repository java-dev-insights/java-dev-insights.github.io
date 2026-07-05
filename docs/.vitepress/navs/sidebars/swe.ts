import { default as PATHS } from '../paths';

const SIDEBAR_DEFAULT_SWE = [
      { text: 'Overview', link: PATHS.SWE_INDEX },
      {
        text: 'Best Practices',
        items: [
          { text: 'Clean Code', link: PATHS.SWE_CLEAN_CODE },
          { text: 'Design Patterns', link: PATHS.SWE_DESIGN_PATTERNS },
        ]
      },
      {
        text: 'SWE Concepts',
        items: [
          { text: 'Cloud Computing', link: PATHS.SWE_CLOUD_COMPUTING },
          { text: 'Distributed Systems', link: PATHS.SWE_DISTRIBUTED_SYSTEMS },
        ]
      },
      {
        text: 'System Design',
        items: [
          { text: 'System Design Concepts', link: PATHS.SWE_SYSTEM_DESIGN },
          { text: 'System Design Examples', link: PATHS.SWE_SYSTEM_DESIGN_EXAMPLES },
        ]
      },
      {
        text: 'Cloud Platform',
        items: [
          { text: 'Amazon Web Services (AWS)', link: PATHS.SWE_AWS },
        ]
      },
    ]

export default SIDEBAR_DEFAULT_SWE;