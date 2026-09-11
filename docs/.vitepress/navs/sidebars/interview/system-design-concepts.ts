import { default as PATHS } from "../../paths";


const SIDEBAR_SYSTEM_DESIGN_CONCEPTS = [
    { text: "<-- Interview Landscape", link: PATHS.INTERVIEW_INDEX },
    { text: "System Design Concepts", link: PATHS.SYSTEM_DESIGN_CONCEPTS },
    {
        text: 'External Resources',
        collapsed: true,
        items: [
            { text: "Blind 75 (Leetcode)", link: 'https://leetcode.com/problem-list/oizxjoit/' },
            { text: "Blind 75 (Neetcode)", link: 'https://neetcode.io/practice/practice/blind75' },
            { text: "Neetcode Roadmap", link: 'https://neetcode.io/roadmap' },
        ],
    },
    {
        text: 'Concepts',
        collapsed: false,
        items: [
            { text: "One to Million", link: 'one-to-million' },
            { text: "CAP Theorem", link: 'cap-theorem' },
            { text: "Consistency Models", link: 'consistency-models' },
            { text: "Load Balancing", link: 'load-balancing' },
            { text: "Caching", link: 'caching' },
            { text: "Database Sharding", link: 'database-sharding' },
            { text: "Message Queues", link: 'message-queues' },
            { text: "Pub/Sub Systems", link: 'pub-sub-systems' },
            { text: "Distributed Systems", link: 'distributed-systems' },
        ],
    },
    {
        text: 'Common Examples',
        collapsed: false,
        items: [
            { text: "URL Shortening", link: 'url-shortening' },
            { text: "Rate Limiting", link: 'rate-limiting' },
            { text: "Notification System", link: 'notification-system' },
        ],
    },
];

export default SIDEBAR_SYSTEM_DESIGN_CONCEPTS;