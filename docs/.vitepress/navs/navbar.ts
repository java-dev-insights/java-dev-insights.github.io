import { default as PATHS } from "./paths";

const TOP_NAVBAR = [
    { text: 'Home', link: PATHS.HOME },
    { 
        text: 'Frontend', 
        items: [
            { 
                // text: 'Basics 🌐', 
                items: [
                    { text: 'Html', link: PATHS.FRONTEND_HTML },
                    { text: 'CSS', link: PATHS.FRONTEND_CSS },
                    { text: 'Javascript', link: PATHS.FRONTEND_JS },
                    { text: 'Bootstrap', link: PATHS.FRONTEND_BOOTSTRAP },
                    { text: 'SASS', link: PATHS.FRONTEND_SASS },
                    { text: 'Jest', link: PATHS.FRONTEND_JEST },
                ]
            },
            { 
                // text: 'Frameworks', 
                items: [
                    { text: 'Vue.js', link: PATHS.FRONTEND_VUE },
                    { text: 'Vue Test Utils', link: PATHS.FRONTEND_VTU },
                    { text: 'Angular', link: PATHS.FRONTEND_ANGULAR },
                ]
            },
            { 
                // text: 'Bundler', 
                items: [
                    { text: 'vite', link: PATHS.FRONTEND_VITE },
                    { text: 'webpack', link: PATHS.FRONTEND_WEBPACK },
                ]
            },            
        ] 
    },
    { 
        text: 'Backend', 
        items: [
            {
                // text: 'Core',
                items: [
                    { text: 'Java', link: PATHS.BACKEND_JAVA },
                    { text: 'Spring', link: PATHS.BACKEND_SPRING },
                    { text: 'Hibernate', link: PATHS.BACKEND_HIBERNATE },
                ]
            },
            {
                // text: 'Testing',
                items: [
                    { text: 'JUnit', link: PATHS.BACKEND_JUNIT },
                    { text: 'Cucumber', link: PATHS.BACKEND_CUCUMBER },
                ]
            },
            {
                // text: 'Utils',
                items: [
                    { text: 'Object Mapper', link: PATHS.BACKEND_OBJECT_MAPPER },
                    { text: 'JSON', link: PATHS.BACKEND_JSON },
                    { text: 'XML', link: PATHS.BACKEND_XML },
                    { text: 'Lombok', link: PATHS.BACKEND_LOMBOK },
                    { text: 'Logger (SLF4J)', link: PATHS.BACKEND_LOGGER },
                    { text: 'Feign', link: PATHS.BACKEND_FEIGN },
                ]
            },
        ] 
    },
    { 
        text: 'APIs', 
        items: [
            {
                // text: 'Utils',
                items: [
                    { text: 'Http', link: PATHS.API_HTTP },
                    { text: 'CORS', link: PATHS.API_CORS },
                    { text: 'REST API', link: PATHS.API_REST },
                    { text: 'OWASP', link: PATHS.API_OWASP },
                ]
            },
            {
                // text: 'API Docs',
                items: [
                    { text: 'Swagger', link: PATHS.API_SWAGGER },
                    { text: 'OpenAPI', link: PATHS.API_OPENAPI },
                ]
            },
            {
                // text: 'WebServices',
                items: [
                    { text: 'WebServices', link: PATHS.API_WEBSERVICES },
                    { text: 'Microservices', link: PATHS.API_MICROSERVICES },
                ]
            },
            {
                // text: 'Messaging',
                items: [
                    { text: 'Apache Kafka', link: PATHS.API_KAFKA },
                    { text: 'RabbitMQ', link: PATHS.API_RABBIT_MQ },
                ]
            },
        ] 
    },
    { 
        text: 'Devops & CICD', 
        items: [
            {
                // text: 'Version and Build',
                items: [
                    { text: 'Git', link: PATHS.DEVOPS_GIT },
                    { text: 'Gradle', link: PATHS.DEVOPS_GRADLE },
                ]
            },
            {
                // text: 'Container',
                items: [
                    { text: 'Containerization', link: PATHS.DEVOPS_CONTAINERIZATION },
                    { text: 'Docker', link: PATHS.DEVOPS_DOCKER },
                ]
            },
            {
                // text: 'Tools',
                items: [
                    { text: 'Jenkins', link: PATHS.DEVOPS_JENKINS },
                    { text: 'Puppet', link: PATHS.DEVOPS_PUPPET },
                    { text: 'NGINX', link: PATHS.DEVOPS_NGINX },
                    { text: 'Nomad', link: PATHS.DEVOPS_NOMAD },
                    { text: 'Kubernetes', link: PATHS.DEVOPS_KUBERNETES },
                ]
            },
            {
                // text: 'Monitoring & Observability',
                items: [
                    { text: 'ELK', link: PATHS.DEVOPS_ELK },
                    { text: 'Grafana', link: PATHS.DEVOPS_GRAFANA },
                ]
            },
        ] 
    },
    { 
        text: 'SWE', 
        items: [
            {
                // text: 'Best Practices',
                items: [
                    { text: 'Clean Code', link: PATHS.SWE_CLEAN_CODE },
                    { text: 'Design Patterns', link: PATHS.SWE_DESIGN_PATTERNS },
                ]
            },
            {
                // text: 'Concepts',
                items: [
                    { text: 'Cloud Computing', link: PATHS.SWE_CLOUD_COMPUTING },
                    { text: 'Distributed Systems', link: PATHS.SWE_DISTRIBUTED_SYSTEMS },
                    { text: 'System Design Concepts', link: PATHS.SWE_SYSTEM_DESIGN },
                    { text: 'System Design Examples', link: PATHS.SWE_SYSTEM_DESIGN_EXAMPLES },
                ]
            },
            {
                // text: 'Cloud Platforms',
                items: [
                    { text: 'AWS', link: PATHS.SWE_AWS },
                ]
            },            
        ] 
    },
    {
        text: 'CSE', 
        items: [
            { text: 'Data Structures', link: PATHS.CSE_DS },
            { text: 'Algorithms', link: PATHS.CSE_ALGO },
            { text: 'Operating Systems (OS)', link: PATHS.CSE_OS },
            { text: 'DBMS', link: PATHS.CSE_DBMS },
            { text: 'Computer Networks', link: PATHS.CSE_CN },
            {
                // text: 'Programming Basics',
                items: [
                    { text: 'Programming', link: PATHS.CSE_PROG_BASIC },
                    { text: 'Cheat Sheet', link: PATHS.CSE_CHEATSHEET },
                    { text: 'Puzzles', link: PATHS.CSE_PUZZLES },
                ]
            },
        ]
    },
    {
        text: 'AI', 
        items: [
            { text: 'Introduction', link: PATHS.AI_INTRO },
        ]
    },
    {
        text: 'Misc', 
        items: [
            {
                // text: 'Programming Basics',
                items: [
                    { text: 'Jekyll', link: PATHS.MISC_JEKYLL },
                    { text: 'Chrome', link: PATHS.MISC_CHROME },
                ]
            },
            { text: 'MD Examples', link: PATHS.MISC_MARKDOWN_EXAMPLES },
            { text: 'References', link: PATHS.MISC_REFS },
        ]
    },
]

export default TOP_NAVBAR;
