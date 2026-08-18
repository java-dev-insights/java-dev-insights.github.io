import { default as PATHS } from "../../paths";

const SIDEBAR_INTERVIEW_LLD = [
	{ text: "Interview Landscape", link: PATHS.INTERVIEW_INDEX },
	{ text: "LLD Interview", link: PATHS.INTERVIEW_LLD },
	{
		text: "External Resources",
		items: [
			{ text: "Blind 75 (Leetcode)", link: "https://leetcode.com/problem-list/oizxjoit/" },
			{ text: "Blind 75 (Neetcode)", link: "https://neetcode.io/practice/practice/blind75" },
			{ text: "Neetcode Roadmap", link: "https://neetcode.io/roadmap" },
		],
	},
	{
		text: "Core Concepts",
		items: [
			{ text: "OOP", link: "oop" },
			{ text: "OOD", link: "ood" },
			{ text: "SOLID", link: "solid" },
		],
	},
	{
		text: "Design Patterns",
		link: "design-patterns",
		items: [
			{ text: "Creational", link: "design-patterns/creational", collapsed: true, },
			{ text: "Structural", link: "design-patterns/structural", collapsed: true, },
			{ text: "Behavioral", link: "design-patterns/behavioral", collapsed: true, },
		],
	},
	{
		text: "Design Examples",
		items: [
			{ text: "Parking Lot", link: "parking-lot" },
			{ text: "LRU Cache", link: "lru-cache" },
		],
	},
];

export default SIDEBAR_INTERVIEW_LLD;
