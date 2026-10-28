import { default as PATHS } from "../../paths";

const SIDEBAR_BACKEND_JAVA = [
	{ text: "<-- Backend", link: PATHS.BACKEND_INDEX },
	{ text: "OOP + OOD (LLD) -->", link: PATHS.INTERVIEW_LLD + "oop" },
	{ text: "Overview - Java", link: PATHS.BACKEND_JAVA },
	{
		text: "Core Java",
		collapsed: true,
		items: [
			{ text: "Java Buzzwords", link: PATHS.BACKEND_JAVA + "core/" },
			{ text: "Data Types & Casting", link: PATHS.BACKEND_JAVA + "core/data-types" },
			{ text: "Operators", link: PATHS.BACKEND_JAVA + "core/operators" },
			{ text: "Control Statements", link: PATHS.BACKEND_JAVA + "core/control-statements" },
			{ text: "Classes", link: PATHS.BACKEND_JAVA + "core/classes" },
			{ text: "Methods", link: PATHS.BACKEND_JAVA + "core/methods" },
			{ text: "Packages", link: PATHS.BACKEND_JAVA + "core/packages" },
			{ text: "Keywords & Identifiers", link: PATHS.BACKEND_JAVA + "core/keywords" },
			{ text: "Interfaces", link: PATHS.BACKEND_JAVA + "core/interface" },
			{ text: "Enums", link: PATHS.BACKEND_JAVA + "core/enums" },
			{ text: "Inheritance", link: PATHS.BACKEND_JAVA + "core/inheritance" },
			{ text: "Garbage Collection (API)", link: PATHS.BACKEND_JAVA + "core/garbage-collection" },
		],
	},
	{
		text: "JVM & GC",
		items: [
			{ text: "JVM Architecture", link: PATHS.BACKEND_JAVA + "jvm-architecture" },
			{ text: "Bytecode & Classpath", link: PATHS.BACKEND_JAVA + "jvm/bytecode-and-classpath" },
			{ text: "JVM Architecture", link: PATHS.BACKEND_JAVA + "jvm/architecture" },
			{ text: "JVM Memory Management", link: PATHS.BACKEND_JAVA + "jvm/memory-management" },
			{ text: "Garbage Collection (GC)", link: PATHS.BACKEND_JAVA + "jvm/garbage-collection" },
		],
	},
	{
		text: "Libraries",
		items: [
			{ text: "Object Mapper", link: PATHS.BACKEND_INDEX + "mapper" },
			{ text: "Json", link: PATHS.BACKEND_INDEX + "json" },
			{ text: "XML", link: PATHS.BACKEND_INDEX + "xml" },
			{ text: "Lombok", link: PATHS.BACKEND_INDEX + "lombok" },
			{ text: "Logger SLF4J", link: PATHS.BACKEND_INDEX + "logger" },
			{ text: "Feign", link: PATHS.BACKEND_INDEX + "feign" },
		],
	},
	{
		text: "API",
		items: [
			{ text: "Http", link: PATHS.BACKEND_INDEX + "http" },
			{ text: "CORS", link: PATHS.BACKEND_INDEX + "cors" },
			{ text: "REST", link: PATHS.BACKEND_INDEX + "rest" },
			{ text: "OWASP", link: PATHS.BACKEND_INDEX + "owasp" },
		],
	},
	{
		text: "Services",
		items: [
			{ text: "WebServices", link: PATHS.BACKEND_INDEX + "webservices" },
			{ text: "Microservices", link: PATHS.BACKEND_INDEX + "microservices" },
		],
	},
	{
		text: "API Docs",
		items: [
			{ text: "Swagger", link: PATHS.BACKEND_INDEX + "swagger" },
			{ text: "Open API", link: PATHS.BACKEND_INDEX + "openapi" },
		],
	},
	{
		text: "Messaging",
		items: [
			{ text: "Apache Kafka", link: PATHS.BACKEND_INDEX + "kafka" },
			{ text: "Rabbit MQ", link: PATHS.BACKEND_INDEX + "rabbit-mq" },
		],
	},
	{
		text: "Next Steps",
		items: [
			{ text: "References", link: PATHS.BACKEND_JAVA + "refs" },
			{ text: "What's Next?", link: PATHS.BACKEND_JAVA + "whats-next" },
		],
	},
];

export default SIDEBAR_BACKEND_JAVA;
