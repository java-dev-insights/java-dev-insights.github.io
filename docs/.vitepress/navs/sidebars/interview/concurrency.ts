import { default as PATHS } from "../../paths";

const SIDEBAR_INTERVIEW_CONCURRENCY = [
    { text: "Interview Landscape", link: PATHS.INTERVIEW_INDEX },
    { text: "Concurrency Interview", link: PATHS.INTERVIEW_CONCURRENCY },
    {
        text: 'External Resources',
        items: [
            { text: "Blind 75 (Leetcode)", link: 'https://leetcode.com/problem-list/oizxjoit/' },
            { text: "Blind 75 (Neetcode)", link: 'https://neetcode.io/practice/practice/blind75' },
            { text: "Neetcode Roadmap", link: 'https://neetcode.io/roadmap' },
        ],
    },
    
    {
        // text: 'Version Control',
        items: [
            { text: "Git", link: 'git' },
            { text: "Gradle", link: 'gradle' },
        ],
    },
];

export default SIDEBAR_INTERVIEW_CONCURRENCY;