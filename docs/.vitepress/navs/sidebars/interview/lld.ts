import { default as PATHS } from "../../paths";

const INTERVIEW_LLD_DESIGN_PATTERNS =  PATHS.INTERVIEW_LLD + "design-patterns/";

const SIDEBAR_INTERVIEW_LLD = [
	{ text: "<-- Interview Landscape", link: PATHS.INTERVIEW_INDEX },
	{ text: "LLD Interview", link: PATHS.INTERVIEW_LLD },
	{
		text: "Core Concepts",
		items: [
			{ text: " OOP", link: PATHS.INTERVIEW_LLD + "oop" },
			{ text: "SOLID", link: PATHS.INTERVIEW_LLD + "solid" },
			{ text: "5 Step Framework", link: PATHS.INTERVIEW_LLD + "5-step-framework" },
			{ text: "OOD", link: PATHS.INTERVIEW_LLD + "ood" },
		],
	},
	{
		text: "Design Patterns",
		items: [
			{ text: "Overview", link: INTERVIEW_LLD_DESIGN_PATTERNS, collapsed: true, },
			{ text: "Creational", link: INTERVIEW_LLD_DESIGN_PATTERNS + "creational/", collapsed: true, },
			{ text: "Structural", link: INTERVIEW_LLD_DESIGN_PATTERNS + "structural/", collapsed: true, },
			{ text: "Behavioral", link: INTERVIEW_LLD_DESIGN_PATTERNS + "behavioral/", collapsed: true, },
			{ text: "Pattern Selection (Interview)", link: INTERVIEW_LLD_DESIGN_PATTERNS + "pattern-selection" },
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
	{
		text: 'Next Steps',
		items: [
			{ text: "References", link: PATHS.INTERVIEW_LLD + "refs" },
			{ text: "What's Next?", link: PATHS.INTERVIEW_LLD + "whats-next" },
		],
	},
];

export default SIDEBAR_INTERVIEW_LLD;
