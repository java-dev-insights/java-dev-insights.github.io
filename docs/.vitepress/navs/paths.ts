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
    INTERVIEW_CONCURRENCY = INTERVIEW_INDEX + "concurrency/",
    INTERVIEW_FAQS = INTERVIEW_INDEX + "faqs/",
    INTERVIEW_BEHAVIORAL = INTERVIEW_INDEX + "behavioral",
    INTERVIEW_SALARY_NEGOTIATIONS = INTERVIEW_INDEX + "salary-negotiations",
    // AI
    AI_INDEX = "/ai/",
    AI_INTRO = "/ai/intro",
    // Miscellaneous
    MISC_INDEX = "/misc/",
    MISC_REFS = MISC_INDEX+"refs",
    MISC_JEKYLL = MISC_INDEX+"jekyll",
    MISC_TEMP = MISC_INDEX+"temp",
}

export default PATH_ENUMS;
