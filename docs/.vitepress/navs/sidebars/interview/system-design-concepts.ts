import { default as PATHS } from "../../paths";

const SYSTEM_DESIGN_CONCEPTS_DISTRIBUTED_SYSTEMS = PATHS.SYSTEM_DESIGN_CONCEPTS+'distributed-systems/';

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
            { text: "How it works (bytebytego)", link: 'https://bytebytego.com/guides/how-it-works/' },
        ],
    },
    {
        text: 'Distributed Systems',
        collapsed: false,
        items: [
            { text: "Overview", link: SYSTEM_DESIGN_CONCEPTS_DISTRIBUTED_SYSTEMS },
            { text: "ACID vs BASE transactions", link: SYSTEM_DESIGN_CONCEPTS_DISTRIBUTED_SYSTEMS+'acid-vs-base' },
            { text: "Communication", link: SYSTEM_DESIGN_CONCEPTS_DISTRIBUTED_SYSTEMS+'communication' },
            { text: "Load Balancing", link: SYSTEM_DESIGN_CONCEPTS_DISTRIBUTED_SYSTEMS+'load-balancing' },
            { text: "Caching", link: SYSTEM_DESIGN_CONCEPTS_DISTRIBUTED_SYSTEMS+'caching' },
            { text: "Database Sharding", link: SYSTEM_DESIGN_CONCEPTS_DISTRIBUTED_SYSTEMS+'database-sharding' },
            { text: "Message Queues", link: SYSTEM_DESIGN_CONCEPTS_DISTRIBUTED_SYSTEMS+'message-queues' },
            { text: "Pub/Sub Systems", link: SYSTEM_DESIGN_CONCEPTS_DISTRIBUTED_SYSTEMS+'pub-sub-systems' },
            { text: "Distributed Systems", link: SYSTEM_DESIGN_CONCEPTS_DISTRIBUTED_SYSTEMS+'distributed-systems' },
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