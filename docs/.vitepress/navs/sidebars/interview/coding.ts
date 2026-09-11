import { default as PATHS } from "../../paths";

const SIDEBAR_INTERVIEW_CODING = [
    { text: "<-- Interview Landscape", link: PATHS.INTERVIEW_INDEX },
    { text: "Coding Interview", link: PATHS.INTERVIEW_CODING },
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