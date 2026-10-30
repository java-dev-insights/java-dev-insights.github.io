/** Paths for Top Navbar Items (Routes) which are also used in sidebars */

const enum PATH_ENUMS {
    // Home and Root Nav Items
    HOME = "/",
    // Tracks
    FRONTEND_INDEX = "/frontend/",
    DEVOPS_INDEX = "/devops/",
    // Backend
    BACKEND_INDEX = "/backend/",
    BACKEND_JAVA = BACKEND_INDEX + "java/",
    BACKEND_SPRING = BACKEND_INDEX + "spring/",
    // Interview
    INTERVIEW_INDEX = "/interview/",
    INTERVIEW_CODING = INTERVIEW_INDEX + "coding/",
    INTERVIEW_LLD = INTERVIEW_INDEX + "lld/",
    SYSTEM_DESIGN_INDEX = "/system-design/",
    HLD_CONCEPTS = INTERVIEW_INDEX + "hld-concepts/",
    HLD_INTERVIEW = INTERVIEW_INDEX + "hld/",
    INTERVIEW_CONCURRENCY = INTERVIEW_INDEX + "concurrency/",
    INTERVIEW_FAQS = INTERVIEW_INDEX + "faqs/",
    INTERVIEW_BEHAVIORAL = INTERVIEW_INDEX + "behavioral/",
    INTERVIEW_SALARY_NEGOTIATIONS = INTERVIEW_INDEX + "salary-negotiations",
    // AI
    AI_INDEX = "/ai/",
    AI_INTRO = "/ai/intro",
    // Miscellaneous
    MISC_INDEX = "/misc/",
    MISC_REFS = MISC_INDEX+"refs/",
    MISC_JEKYLL = MISC_INDEX+"jekyll",
}

export default PATH_ENUMS;
