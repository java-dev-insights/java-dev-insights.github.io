import { default as PATHS } from "../../paths";

const SIDEBAR_DEFAULT_INTERVIEW = [
	{ text: "Interview Landscape", link: PATHS.INTERVIEW_INDEX },
	{
		text: "Coding & Concurrency",
		items: [
			{ text: "Coding Interview", link: PATHS.INTERVIEW_CODING },
			{ text: "Concurrency", link: PATHS.INTERVIEW_CONCURRENCY },
		],
	},
	{
		text: "System Design",
		items: [
			{ text: "System Design", link: PATHS.SYSTEM_DESIGN_INDEX },
			{ text: "LLD", link: PATHS.INTERVIEW_LLD },
			{ text: "HLD (Concepts)", link: PATHS.HLD_CONCEPTS },
			{ text: "HLD (Interview)", link: PATHS.HLD_INTERVIEW },
		],
	},
	{
		text: "FAQs",
		link: PATHS.INTERVIEW_FAQS,
		items: [
			{ text: "Java", link: PATHS.INTERVIEW_FAQS + "java" },
			{ text: "Spring", link: PATHS.INTERVIEW_FAQS + "spring" },
		],
	},
	{
		items: [
			{ text: "Behavioral", link: PATHS.INTERVIEW_BEHAVIORAL },
			{ text: "Salary Negotiations", link: PATHS.INTERVIEW_SALARY_NEGOTIATIONS },
		],
	},
	{
		text: 'Next Steps',
		collapsed: true,
		items: [
			{ text: "References", link: PATHS.INTERVIEW_INDEX + "refs" },
			{ text: "What's Next?", link: PATHS.INTERVIEW_INDEX + "whats-next" },
		],
	},
];

export default SIDEBAR_DEFAULT_INTERVIEW;
