import { default as PATHS } from "../../paths";

const SIDEBAR_INTERVIEW_CODING = [
    { text: "Overview", link: PATHS.INTERVIEW_INDEX },
    {
        // text: 'Version Control',
        items: [
            { text: "Git", link: 'git' },
            { text: "Gradle", link: 'gradle' },
        ],
    },
];

export default SIDEBAR_INTERVIEW_CODING;