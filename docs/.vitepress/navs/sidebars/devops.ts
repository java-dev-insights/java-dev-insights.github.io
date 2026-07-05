import { default as PATHS } from '../paths';

const SIDEBAR_DEFAULT_DEVOPS = [
      { text: 'Overview', link: PATHS.DEVOPS_INDEX },
      {
        // text: 'Version Control',
        items: [
          { text: 'Git', link: PATHS.DEVOPS_GIT },
          { text: 'Gradle', link: PATHS.DEVOPS_GRADLE },
        ]
      },
      {
        // text: 'Tools',
        items: [
          { text: 'Jenkins', link: PATHS.DEVOPS_JENKINS },
          { text: 'Puppet', link: PATHS.DEVOPS_PUPPET },
          { text: 'Nginx', link: PATHS.DEVOPS_NGINX },
        ]
      },
      {
        text: 'Container Orchestration',
        items: [
          { text: 'Containerization', link: PATHS.DEVOPS_CONTAINERIZATION },
          { text: 'Docker', link: PATHS.DEVOPS_DOCKER },
          { text: 'Kubernetes', link: PATHS.DEVOPS_KUBERNETES },
          { text: 'Hasicorp Nomad', link: PATHS.DEVOPS_NOMAD },
        ]
      },
      {
        text: 'Monitoring & Observability',
        items: [
          { text: 'ELK', link: PATHS.DEVOPS_ELK },
          { text: 'Grafana', link: PATHS.DEVOPS_GRAFANA },
        ]
      },
    ]

export default SIDEBAR_DEFAULT_DEVOPS;