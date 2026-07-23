import { default as PATHS } from '../paths';

const SIDEBAR_DEFAULT_BACKEND = [
      { text: 'Overview - Backend', link: PATHS.BACKEND_INDEX },
      {
        text: 'Basic',
        items: [
          { text: 'Java', link: PATHS.BACKEND_JAVA },
          { text: 'Spring', link: PATHS.BACKEND_SPRING },
          { text: 'Hibernate', link: PATHS.BACKEND_HIBERNATE },
        ]
      },
      {
        text: 'Testing',
        items: [
          { text: 'JUnit', link: PATHS.BACKEND_JUNIT },
          // { text: 'Mockito', link: PATHS.BACKEND_MOCKITO },
          { text: 'Cucumber', link: PATHS.BACKEND_CUCUMBER },
        ]
      },
      {
        text: 'Libraries',
        items: [
          { text: 'Object Mapper', link: PATHS.BACKEND_OBJECT_MAPPER },
          { text: 'Json', link: PATHS.BACKEND_JSON },
          { text: 'XML', link: PATHS.BACKEND_XML },
          { text: 'Lombok', link: PATHS.BACKEND_LOMBOK },
          { text: 'Logger SLF4J', link: PATHS.BACKEND_LOGGER },
          { text: 'Feign', link: PATHS.BACKEND_FEIGN },
        ]
      },
    ]

export default SIDEBAR_DEFAULT_BACKEND;