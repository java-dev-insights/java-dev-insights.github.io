import { default as PATHS } from "../../paths";

const SIDEBAR_INTERVIEW_CODING = [
	{ text: "<-- Interview Landscape", link: PATHS.INTERVIEW_INDEX },
	{ text: "Coding Interview", link: PATHS.INTERVIEW_CODING },
	{
		text: "Data Structures",
		items: [
			{ text: "Overview", link: PATHS.INTERVIEW_CODING + "ds/" },
			{
				text: "Linear",
				collapsed: false,
				items: [
					{ text: "Arrays", link: "arrays" },
					{ text: "Strings", link: "strings" },
					{ text: "Linked Lists", link: "linked-lists" },
				],
			},
			{
				text: "Non-Linear",
				collapsed: false,
				items: [
					{ text: "Trees", link: PATHS.INTERVIEW_CODING + "ds/trees" },
					{ text: "Graphs", link: PATHS.INTERVIEW_CODING + "ds/graphs" },
				],
			},
		],
	},
	{
		text: "Algorithms",
		items: [
			{ text: "Overview", link: PATHS.INTERVIEW_CODING + "algo/" },
			{
				text: "Searching",
				collapsed: true,
				items: [
					{ text: "Linear Search", link: PATHS.INTERVIEW_CODING + "algo/search" },
					{ text: "Binary Search", link: PATHS.INTERVIEW_CODING + "algo/search" },
				],
			},
			{
				text: "Sorting (Comparison)",
				collapsed: true,
				items: [
					{ text: "Overview", link: PATHS.INTERVIEW_CODING + "algo/sorting/comparison" },
				],
			},
			{
				text: "Sorting (Non-Comparison)",
				collapsed: true,
				items: [
					{ text: "Overview", link: PATHS.INTERVIEW_CODING + "algo/sorting/non-comparison" },
				],
			},
			{
				text: "Sorting (Hybrid)",
				collapsed: true,
				items: [
					{ text: "Tim Sort", link: PATHS.INTERVIEW_CODING + "algo/sorting/tim-sort" },
					{ text: "Intro Sort", link: PATHS.INTERVIEW_CODING + "algo/sorting/intro-sort" },
				],
			},
			{ text: "Arrays", link: "arrays" },
			{ text: "Strings", link: "strings" },
			{ text: "Linked Lists", link: "linked-lists" },
			{ text: "Trees", link: "trees" },
		],
	},
	{
		text: "Common Patterns",
		items: [
			{ text: "Overview", link: PATHS.INTERVIEW_CODING + "patterns/" },
			{ text: "Arrays", link: "arrays" },
			{ text: "Strings", link: "strings" },
			{ text: "Linked Lists", link: "linked-lists" },
			{ text: "Trees", link: "trees" },
		],
	},
	{
		text: "Next Steps",
		items: [
			{ text: "References", link: PATHS.INTERVIEW_CODING + "refs" },
			{ text: "What's Next?", link: PATHS.INTERVIEW_CODING + "whats-next" },
		],
	},
];

export default SIDEBAR_INTERVIEW_CODING;
