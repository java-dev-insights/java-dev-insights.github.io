import { default as PATHS } from "../../paths";

const SIDEBAR_INTERVIEW_CODING = [
    { text: "Overview", link: PATHS.INTERVIEW_INDEX },
    {
        // text: 'Version Control',
        items: [
            { text: "Git", link: PATHS.DEVOPS_GIT },
            { text: "Gradle", link: PATHS.DEVOPS_GRADLE },
        ],
    },
];

export default SIDEBAR_INTERVIEW_CODING;