import { default as PATHS } from "../../paths";

const SIDEBAR_INTERVIEW_CODING_PATTERNS = PATHS.INTERVIEW_CODING + "patterns/";

const SIDEBAR_INTERVIEW_CODING = [
	{ text: "<-- Interview Landscape", link: PATHS.INTERVIEW_INDEX },
	{ text: "Coding Interview", link: PATHS.INTERVIEW_CODING },
	{
		text: "Data Structures",
		collapsed: false,
		items: [
			{ text: "Overview", link: PATHS.INTERVIEW_CODING + "ds/" },
			{ text: "Arrays", link: "arrays" },
			{ text: "Stacks", link: PATHS.INTERVIEW_CODING + "ds/stacks" },
			{ text: "Queues", link: PATHS.INTERVIEW_CODING + "ds/queues" },
			{ text: "Linked Lists", link: "linked-lists" },
			{ text: "Trees", link: PATHS.INTERVIEW_CODING + "ds/trees" },
			{ text: "Graphs", link: PATHS.INTERVIEW_CODING + "ds/graphs" },
			{ text: "Hash Tables", link: PATHS.INTERVIEW_CODING + "ds/hash-tables" },
			{ text: "Heaps", link: PATHS.INTERVIEW_CODING + "ds/heaps" },
			{ text: "Tries", link: PATHS.INTERVIEW_CODING + "ds/tries" },
			{ text: "Disjoint Sets", link: PATHS.INTERVIEW_CODING + "ds/disjoint-sets" },
			{ text: "Strings", link: "strings" },
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
			{ text: "Overview", link: SIDEBAR_INTERVIEW_CODING_PATTERNS },
			{ text: "Two Pointers", link: SIDEBAR_INTERVIEW_CODING_PATTERNS + "two-pointers" },
			{ text: "Sliding Window", link: SIDEBAR_INTERVIEW_CODING_PATTERNS + "sliding-window" },
			{ text: "Binary Search", link: SIDEBAR_INTERVIEW_CODING_PATTERNS + "binary-search" },
			{ text: "Frequency Counting", link: SIDEBAR_INTERVIEW_CODING_PATTERNS + "frequency-counting" },
			{ text: "Matrix Traversal", link: SIDEBAR_INTERVIEW_CODING_PATTERNS + "matrix-traversal" },
			{ text: "Monotonic Stack", link: SIDEBAR_INTERVIEW_CODING_PATTERNS + "monotonic-stack" },
			{ text: "Prefix Sums", link: SIDEBAR_INTERVIEW_CODING_PATTERNS + "prefix-sums" },
			{ text: "Overlapping Intervals", link: SIDEBAR_INTERVIEW_CODING_PATTERNS + "overlapping-intervals" },
			{ text: "Greedy", link: SIDEBAR_INTERVIEW_CODING_PATTERNS + "greedy" },
			{ text: "Top K Elements", link: SIDEBAR_INTERVIEW_CODING_PATTERNS + "top-k-elements" },
			{ text: "Backtracking", link: SIDEBAR_INTERVIEW_CODING_PATTERNS + "backtracking" },
			{ text: "Binary Tree Traversal", link: SIDEBAR_INTERVIEW_CODING_PATTERNS + "binary-tree-traversal" },
			{ text: "Depth-First Search", link: SIDEBAR_INTERVIEW_CODING_PATTERNS + "depth-first-search" },
			{ text: "Breadth-First Search", link: SIDEBAR_INTERVIEW_CODING_PATTERNS + "breadth-first-search" },
			{ text: "Dynamic Programming", link: SIDEBAR_INTERVIEW_CODING_PATTERNS + "dynamic-programming" },
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
