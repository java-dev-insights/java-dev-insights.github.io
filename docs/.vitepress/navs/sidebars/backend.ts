import { default as PATHS } from '../paths';

const SIDEBAR_DEFAULT_BACKEND = [
      { text: 'Overview - Backend', link: PATHS.BACKEND_INDEX },
      {
        text: 'Main',
        items: [
          { 
            text: 'Java', 
            // link: PATHS.BACKEND_INDEX+'java', 
            collapsed: true,
            items: [
              { text: 'OOP and OOD', link: '/backend/java/oop-and-ood' },
              { text: 'JVM Architecture', link: '/backend/java/jvm-architecture' },
              { text: 'Replace_This', link: '/backend/java/replace_this' },
            ]
          },
          { text: 'Spring', link: PATHS.BACKEND_INDEX+'spring' },
          { text: 'Hibernate', link: PATHS.BACKEND_INDEX+'hibernate' },
        ]
      },
      {
        text: 'Testing',
        items: [
          { text: 'JUnit', link: PATHS.BACKEND_INDEX+'junit' },
          // { text: 'Mockito', link: PATHS.BACKEND_INDEX+'mockito' },
          { text: 'Cucumber', link: PATHS.BACKEND_INDEX+'cucumber' },
        ]
      },
      {
        text: 'Libraries',
        items: [
          { text: 'Object Mapper', link: PATHS.BACKEND_INDEX+'mapper' },
          { text: 'Json', link: PATHS.BACKEND_INDEX+'json' },
          { text: 'XML', link: PATHS.BACKEND_INDEX+'xml' },
          { text: 'Lombok', link: PATHS.BACKEND_INDEX+'lombok' },
          { text: 'Logger SLF4J', link: PATHS.BACKEND_INDEX+'logger' },
          { text: 'Feign', link: PATHS.BACKEND_INDEX+'feign' },
        ]
      },
      {
        text: 'API',
        items: [
          { text: 'Http', link: PATHS.BACKEND_INDEX+'http' },
          { text: 'CORS', link: PATHS.BACKEND_INDEX+'cors' },
          { text: 'REST', link: PATHS.BACKEND_INDEX+'rest' },
          { text: 'OWASP', link: PATHS.BACKEND_INDEX+'owasp' },
        ]
      },
      {
        text: 'Services',
        items: [
          { text: 'WebServices', link: PATHS.BACKEND_INDEX+'webservices' },
          { text: 'Microservices', link: PATHS.BACKEND_INDEX+'microservices' },
        ]
      },
      {
        text: 'API Docs',
        items: [
          { text: 'Swagger', link: PATHS.BACKEND_INDEX+'swagger' },
          { text: 'Open API', link: PATHS.BACKEND_INDEX+'openapi' },
        ]
      },
      {
        text: 'Messaging',
        items: [
          { text: 'Apache Kafka', link: PATHS.BACKEND_INDEX+'kafka' },
          { text: 'Rabbit MQ', link: PATHS.BACKEND_INDEX+'rabbit-mq' },
        ]
      },
    ]

export default SIDEBAR_DEFAULT_BACKEND;