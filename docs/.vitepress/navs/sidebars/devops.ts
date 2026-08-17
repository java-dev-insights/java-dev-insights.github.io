import { default as PATHS } from '../paths';

const SIDEBAR_DEFAULT_DEVOPS = [
      { text: 'Overview', link: PATHS.DEVOPS_INDEX },
      {
        // text: 'Version Control',
        items: [
          { text: 'Git', link: PATHS.DEVOPS_INDEX+'git' },
          { text: 'Gradle', link: PATHS.DEVOPS_INDEX+'gradle' },
        ]
      },
      {
        // text: 'Tools',
        items: [
          { text: 'Jenkins', link: PATHS.DEVOPS_INDEX+'jenkins' },
          { text: 'Puppet', link: PATHS.DEVOPS_INDEX+'puppet' },
          { text: 'Nginx', link: PATHS.DEVOPS_INDEX+'nginx' },
        ]
      },
      {
        text: 'Container Orchestration',
        items: [
          { text: 'Containerization', link: PATHS.DEVOPS_INDEX+'containerization' },
          { text: 'Docker', link: PATHS.DEVOPS_INDEX+'docker' },
          { text: 'Kubernetes', link: PATHS.DEVOPS_INDEX+'kubernetes' },
          { text: 'Hasicorp Nomad', link: PATHS.DEVOPS_INDEX+'nomad' },
        ]
      },
      {
        text: 'Monitoring & Observability',
        items: [
          { text: 'ELK', link: PATHS.DEVOPS_INDEX+'elk' },
          { text: 'Grafana', link: PATHS.DEVOPS_INDEX+'grafana' },
        ]
      },
    ]

export default SIDEBAR_DEFAULT_DEVOPS;