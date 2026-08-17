import { default as PATHS } from "../paths";

const SIDEBAR_DEFAULT_INTERVIEW = [
	{ text: "Interview Landscape", link: PATHS.INTERVIEW_INDEX },
	{
		// text: "Interview Landscape",
		items: [
			{ text: "Coding Interview", link: PATHS.INTERVIEW_CODING },
			{ text: "LLD", link: PATHS.INTERVIEW_LLD },
			{ text: "System Design", link: PATHS.INTERVIEW_SYSTEM_DESIGN },
      { text: "Concurrency", link: PATHS.INTERVIEW_CONCURRENCY },
		],
	},
	{ 
    text: "Other FAQs", 
    link: PATHS.INTERVIEW_FAQS,
    items: [
      { text: "Java", link: PATHS.INTERVIEW_FAQS+"java" },
      { text: "Spring", link: PATHS.INTERVIEW_FAQS+"spring" },
    ]
  },
	{ text: "Behavioral", link: PATHS.INTERVIEW_BEHAVIORAL },
	{ text: "Salary Negotiations", link: PATHS.INTERVIEW_SALARY_NEGOTIATIONS },
];

export default SIDEBAR_DEFAULT_INTERVIEW;
