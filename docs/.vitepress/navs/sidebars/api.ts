import { default as PATHS } from '../paths';

const SIDEBAR_DEFAULT_API = [
      { text: 'Overview', link: PATHS.API_INDEX },
      {
        text: 'Core',
        items: [
          { text: 'Http', link: PATHS.API_HTTP },
          { text: 'CORS', link: PATHS.API_CORS },
          { text: 'REST', link: PATHS.API_REST },
          { text: 'OWASP', link: PATHS.API_OWASP },
        ]
      },
      {
        text: 'Services',
        items: [
          { text: 'WebServices', link: PATHS.API_WEBSERVICES },
          { text: 'Microservices', link: PATHS.API_MICROSERVICES },
        ]
      },
      {
        text: 'API Docs',
        items: [
          { text: 'Swagger', link: PATHS.API_SWAGGER },
          { text: 'Open API', link: PATHS.API_OPENAPI },
        ]
      },
      {
        text: 'Messaging',
        items: [
          { text: 'Apache Kafka', link: PATHS.API_KAFKA },
          { text: 'Rabbit MQ', link: PATHS.API_RABBIT_MQ },
        ]
      },
    ]

export default SIDEBAR_DEFAULT_API;