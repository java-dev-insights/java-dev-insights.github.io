import { default as PATHS } from "../../paths";

const SIDEBAR_INTERVIEW_LLD = [
	{ text: "Interview Landscape", link: PATHS.INTERVIEW_INDEX },
	{ text: "LLD Interview", link: PATHS.INTERVIEW_LLD },
	{
		text: "External Resources",
		collapsed: true,
		items: [
			{ text: "Hello Interview", link: "https://www.hellointerview.com/learn/low-level-design/in-a-hurry/introduction" },
			{ text: "Algo Expert", link: "https://www.algoexpert.io/systems/fundamentals" },
			{ text: "AlgoMaster", link: "https://algomaster.io/learn/lld/course-introduction" },
			{ text: "FB guy LLD HLD", link: "https://livecohortbypradeep.com/index.html#curriculum" },
		],
	},
	{
		text: "Core Concepts",
		items: [
			{ text: " OOP", link: "oop" },
			{ text: "SOLID", link: "solid" },
			{ text: "5 Step Framework", link: "5-step-framework" },
			{ text: "OOD", link: "ood" },
		],
	},
	{
		text: "Design Patterns",
		link: "design-patterns",
		items: [
			{ text: "Creational", link: "design-patterns/creational", collapsed: true, },
			{ text: "Structural", link: "design-patterns/structural", collapsed: true, },
			{ text: "Behavioral", link: "design-patterns/behavioral", collapsed: true, },
			{ text: "Pattern Selection (Interview)", link: "design-patterns/pattern-selection" },
		],
	},
	{
		text: "Design Examples",
		items: [
			{ text: "LLD Concurrency Control", link: "concurrency-control" },
			{ text: "Parking Lot", link: "parking-lot" },
			{ text: "LRU Cache", link: "lru-cache" },
			{ text: "Chess Game", link: "chess-game" },
		],
	},
];

export default SIDEBAR_INTERVIEW_LLD;
