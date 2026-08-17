/** Paths for Top Navbar Items (Routes) which are also used in sidebars */

const enum PATH_ENUMS {
    // Home and Root Nav Items
    HOME = "/",
    // Tracks
    FRONTEND_INDEX = "/frontend/",
    BACKEND_INDEX = "/backend/",
    DEVOPS_INDEX = "/devops/",
    // Interview
    INTERVIEW_INDEX = "/interview/",
    INTERVIEW_CODING = INTERVIEW_INDEX + "coding/",
    INTERVIEW_LLD = INTERVIEW_INDEX + "lld/",
    INTERVIEW_SYSTEM_DESIGN = INTERVIEW_INDEX + "system-design/",
    INTERVIEW_FAQS = INTERVIEW_INDEX + "faqs/",
    INTERVIEW_BEHAVIORIAL = INTERVIEW_INDEX + "behaviorial/",
    INTERVIEW_SALARY_NEGOTIATIONS = INTERVIEW_INDEX + "salary-negotiations/",
    // AI
    AI_INDEX = "/ai/",
    AI_INTRO = "/ai/intro",
    // Miscellaneous
    MISC_INDEX = "/misc/",
    MISC_REFS = MISC_INDEX+"refs",
    MISC_JEKYLL = MISC_INDEX+"jekyll",
    MISC_TEMP = MISC_INDEX+"temp",
    // SWE
    SWE_INDEX = "/swe",
    SWE_CLEAN_CODE = "/swe/clean-code",
    SWE_DESIGN_PATTERNS = "/swe/design-patterns",
    SWE_CLOUD_COMPUTING = "/swe/cloud-computing",
    SWE_DISTRIBUTED_SYSTEMS = "/swe/distributed-systems",
    SWE_SYSTEM_DESIGN = "/swe/system-design",
    SWE_SYSTEM_DESIGN_EXAMPLES = "/swe/system-design-examples",
    SWE_AWS = "/swe/aws",
}

export default PATH_ENUMS;
