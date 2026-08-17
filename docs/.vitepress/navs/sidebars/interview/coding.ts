import { default as PATHS } from "../../paths";

const SIDEBAR_INTERVIEW_CODING = [
    { text: "Interview Landscape", link: PATHS.INTERVIEW_INDEX },
    { text: "Coding Interview", link: PATHS.INTERVIEW_CODING },
    {
        text: 'External Resources',
        items: [
            { text: "Blind 75 (Leetcode)", link: 'https://leetcode.com/problem-list/oizxjoit/' },
            { text: "Blind 75 (Neetcode)", link: 'https://neetcode.io/practice/practice/blind75' },
            { text: "Neetcode Roadmap", link: 'https://neetcode.io/roadmap' },
            { text: "Practice Hackerrank", link: 'https://www.hackerrank.com/domains/data-structures' },
        ],
    },
    {
        text: 'DSA',
        items: [
            { text: "Arrays", link: 'arrays' },
            { text: "Strings", link: 'strings' },
            { text: "Linked Lists", link: 'linked-lists' },
            { text: "Trees", link: 'trees' },
        ],
    },
    {
        text: 'Common Patterns',
        items: [
            { text: "Arrays", link: 'arrays' },
            { text: "Strings", link: 'strings' },
            { text: "Linked Lists", link: 'linked-lists' },
            { text: "Trees", link: 'trees' },
        ],
    },
];

export default SIDEBAR_INTERVIEW_CODING;