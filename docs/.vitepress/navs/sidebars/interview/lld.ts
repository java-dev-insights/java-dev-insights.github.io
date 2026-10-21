import { default as PATHS } from "../../paths";

const INTERVIEW_LLD_DESIGN_PATTERNS =  PATHS.INTERVIEW_LLD + "design-patterns/";

const SIDEBAR_INTERVIEW_LLD = [
	{ text: "<-- Interview Landscape", link: PATHS.INTERVIEW_INDEX },
	{ text: "LLD Interview", link: PATHS.INTERVIEW_LLD },
	{
		text: "OOP & OOD",
		items: [
			{ text: "Overview", link: PATHS.INTERVIEW_LLD + "ood/" },
			{ text: "OOP", link: PATHS.INTERVIEW_LLD + "oop" },
			{ text: "SOLID Principles", link: PATHS.INTERVIEW_LLD + "ood/solid" },
			{ text: "Design Philosophies", link: PATHS.INTERVIEW_LLD + "ood/design-philosophies" },
			{ text: "Delegation Principles", link: PATHS.INTERVIEW_LLD + "ood/delegation-principles" },
			{ text: "FURPS+ Quality Model", link: PATHS.INTERVIEW_LLD + "ood/furps" },
			{ text: "GRASP Patterns", link: PATHS.INTERVIEW_LLD + "ood/grasp" },
		],
	},
	{
		text: "Diagrams",
		items: [
			{ text: " UML", link: PATHS.INTERVIEW_LLD + "diagrams/uml" },
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
			{ text: "5 Step Framework", link: PATHS.INTERVIEW_LLD + "5-step-framework" },
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
