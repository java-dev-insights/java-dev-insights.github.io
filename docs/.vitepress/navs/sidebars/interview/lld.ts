import { default as PATHS } from "../../paths";

const INTERVIEW_LLD_DESIGN_PATTERNS = PATHS.INTERVIEW_LLD + "design-patterns/";

const SIDEBAR_INTERVIEW_LLD = [
	{ text: "<-- Interview Landscape", link: PATHS.INTERVIEW_INDEX },
	{ text: "LLD Interview", link: PATHS.INTERVIEW_LLD },
	{
		text: "OOP & OOD",
		collapsed: true,
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
		collapsed: true,
		items: [{ text: " UML", link: PATHS.INTERVIEW_LLD + "diagrams/uml" }],
	},
	{
		text: "Design Patterns",
		collapsed: true,
		items: [
			{ text: "Overview", link: INTERVIEW_LLD_DESIGN_PATTERNS, collapsed: true },
			{ text: "Creational", link: INTERVIEW_LLD_DESIGN_PATTERNS + "creational/", collapsed: true },
			{ text: "Structural", link: INTERVIEW_LLD_DESIGN_PATTERNS + "structural/", collapsed: true },
			{ text: "Behavioral", link: INTERVIEW_LLD_DESIGN_PATTERNS + "behavioral/", collapsed: true },
			{ text: "Pattern Selection (Interview)", link: INTERVIEW_LLD_DESIGN_PATTERNS + "pattern-selection" },
		],
	},
	{
		text: "Interview Questions",
		items: [
			{ text: "5 Step Framework", link: PATHS.INTERVIEW_LLD + "5-step-framework" },
			{ text: "LLD Concurrency Control", link: PATHS.INTERVIEW_LLD + "concurrency-control" },
			{
				text: "Games",
				items: [
					{ text: "Tic Tac Toe", link: PATHS.INTERVIEW_LLD + "problems/tic-tac-toe" },
					{ text: "Chess Game", link: PATHS.INTERVIEW_LLD + "problems/chess-game" },
				],
			},
			{
				text: "Manage State",
				items: [
					{ text: "Elevator System", link: PATHS.INTERVIEW_LLD + "problems/elevator-system" },
					{ text: "ATM Machine", link: PATHS.INTERVIEW_LLD + "problems/atm-machine" },
					{ text: "Vending Machine", link: PATHS.INTERVIEW_LLD + "problems/vending-machine" },
				],
			},
			{ text: "Parking Lot", link: PATHS.INTERVIEW_LLD + "problems/parking-lot" },
			{ text: "LRU Cache", link: PATHS.INTERVIEW_LLD + "problems/lru-cache" },
		],
	},
	{
		text: "Next Steps",
		items: [
			{ text: "References", link: PATHS.INTERVIEW_LLD + "refs" },
			{ text: "What's Next?", link: PATHS.INTERVIEW_LLD + "whats-next" },
		],
	},
];

export default SIDEBAR_INTERVIEW_LLD;
