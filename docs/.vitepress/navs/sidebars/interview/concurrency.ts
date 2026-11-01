import { default as PATHS } from "../../paths";

const SIDEBAR_INTERVIEW_CONCURRENCY = [
    { text: "<-- ⬅️ Interview Landscape", link: PATHS.INTERVIEW_INDEX },
    { text: "Concurrency Interview", link: PATHS.INTERVIEW_CONCURRENCY },
    {
        text: 'Introduction',
        items: [
            { text: "Intro to Concurrency", link: PATHS.INTERVIEW_CONCURRENCY + "intro" },
            { text: "Concurrency vs Parallelism", link: PATHS.INTERVIEW_CONCURRENCY + "concurrency-vs-parallelism" },
        ],
    },    
    {
        text: 'Locking Strategies',
        items: [
            { text: "Optimistic Locking", link: PATHS.INTERVIEW_CONCURRENCY + "optimistic-locking" },
            { text: "Pessimistic Locking", link: PATHS.INTERVIEW_CONCURRENCY + "pessimistic-locking" },
        ],
    },
];

export default SIDEBAR_INTERVIEW_CONCURRENCY;