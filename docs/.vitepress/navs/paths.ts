/** Paths for Top Navbar Items (Routes) which are also used in sidebars */

const enum PATH_ENUMS {
    // Home and Root Nav Items
    HOME = "/",
    FRONTEND_INDEX = "/frontend/",
    BACKEND_INDEX = "/backend/",
    DEVOPS_INDEX = "/devops/",
    INTERVIEW_INDEX = "/interview/",
    MISC_INDEX = "/misc/",
    AI_INDEX = "/ai/",
    // Sub Folders
    INTERVIEW_CODING = INTERVIEW_INDEX + "coding/",
    INTERVIEW_LLD = INTERVIEW_INDEX + "lld/",
    INTERVIEW_SYSTEM_DESIGN = INTERVIEW_INDEX + "system-design/",
    INTERVIEW_FAQS = INTERVIEW_INDEX + "faqs/",
    INTERVIEW_BEHAVIORIAL = INTERVIEW_INDEX + "behaviorial/",
    INTERVIEW_SALARY_NEGOTIATIONS = INTERVIEW_INDEX + "salary-negotiations/",
    MISC_UTILS = "/misc/utils/",
    MISC_EXAMPLES = "/misc/examples/",
    /** Sidebar links */
    // APIs & Microservices
    API_INDEX = "/api",
    API_HTTP = "/api/http",
    API_CORS = "/api/cors",
    API_REST = "/api/rest",
    API_WEBSERVICES = "/api/webservices",
    API_MICROSERVICES = "/api/microservices",
    API_SWAGGER = "/api/swagger",
    API_OPENAPI = "/api/openapi",
    API_KAFKA = "/api/kafka",
    API_RABBIT_MQ = "/api/rabbit-mq",
    API_OWASP = "/api/owasp",
    // DevOps & CI/CD Tools
    DEVOPS_GIT = "/devops/git",
    DEVOPS_GRADLE = "/devops/gradle",
    DEVOPS_JENKINS = "/devops/jenkins",
    DEVOPS_PUPPET = "/devops/puppet",
    DEVOPS_NGINX = "/devops/nginx",
    DEVOPS_CONTAINERIZATION = "/devops/containerization",
    DEVOPS_DOCKER = "/devops/docker",
    DEVOPS_KUBERNETES = "/devops/kubernetes",
    DEVOPS_NOMAD = "/devops/nomad",
    DEVOPS_ELK = "/devops/elk",
    DEVOPS_GRAFANA = "/devops/grafana",
    // SWE
    SWE_INDEX = "/swe",
    SWE_CLEAN_CODE = "/swe/clean-code",
    SWE_DESIGN_PATTERNS = "/swe/design-patterns",
    SWE_CLOUD_COMPUTING = "/swe/cloud-computing",
    SWE_DISTRIBUTED_SYSTEMS = "/swe/distributed-systems",
    SWE_SYSTEM_DESIGN = "/swe/system-design",
    SWE_SYSTEM_DESIGN_EXAMPLES = "/swe/system-design-examples",
    SWE_AWS = "/swe/aws",
    // Miscellaneous
    AI_INTRO = "/ai/intro",
    // Miscellaneous
    MISC_REFS = MISC_INDEX+"refs",
    MISC_JEKYLL = MISC_INDEX+"jekyll",
    MISC_TEMP = MISC_INDEX+"temp",
}

export default PATH_ENUMS;
