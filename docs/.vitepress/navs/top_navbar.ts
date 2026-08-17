import { default as PATHS } from "./paths";

const TOP_NAVBAR = [
    // { text: 'Home', link: PATHS.HOME },
    {
        text: 'Tracks', 
        items: [
            { text: 'Frontend Dev', link: PATHS.FRONTEND_INDEX },
            { text: 'Backend Dev', link: PATHS.BACKEND_INDEX },
            { text: 'Devops & CICD', link: PATHS.DEVOPS_INDEX },
        ]
    },
    {
        text: 'Interview', 
        items: [
            { text: 'Interview Landscape', link: PATHS.INTERVIEW_INDEX },
            { text: 'Coding', link: PATHS.INTERVIEW_CODING },
            { text: 'LLD', link: PATHS.INTERVIEW_LLD },
            { text: 'System Design', link: PATHS.INTERVIEW_SYSTEM_DESIGN },
            { text: 'Concurrency', link: PATHS.INTERVIEW_CONCURRENCY },
            { text: 'FAQs', link: PATHS.INTERVIEW_FAQS },
            { text: 'Behavioral', link: PATHS.INTERVIEW_BEHAVIORAL },
            { text: 'Salary Negotiations', link: PATHS.INTERVIEW_SALARY_NEGOTIATIONS },
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
            { text: 'References', link: PATHS.MISC_REFS },
            { text: 'Jekyll', link: PATHS.MISC_JEKYLL },
            { text: 'temp', link: PATHS.MISC_TEMP },
        ]
    },
]

export default TOP_NAVBAR;
