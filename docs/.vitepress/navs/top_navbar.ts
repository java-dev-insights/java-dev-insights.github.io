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
            { text: 'Behaviorial', link: PATHS.INTERVIEW_BEHAVIORIAL },
            { text: 'FAQs', link: PATHS.INTERVIEW_FAQS },
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
]

export default TOP_NAVBAR;
