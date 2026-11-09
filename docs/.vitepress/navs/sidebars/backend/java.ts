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
			{ text: "Methods & Bindings", link: PATHS.BACKEND_JAVA + "core/methods" },
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
		collapsed: true,
		items: [
			{ text: "JVM Internals", link: PATHS.BACKEND_JAVA + "jvm/" },
			{ text: "Bytecode & Classpath", link: PATHS.BACKEND_JAVA + "jvm/bytecode-and-classpath" },
			{ text: "JDK vs JRE vs JVM", link: PATHS.BACKEND_JAVA + "jvm/jdk-jre-jvm" },
			{ text: "JVM Architecture", link: PATHS.BACKEND_JAVA + "jvm/architecture" },
			{ text: "JVM Memory Management", link: PATHS.BACKEND_JAVA + "jvm/memory-management" },
			{ text: "Garbage Collection (GC)", link: PATHS.BACKEND_JAVA + "jvm/garbage-collection" },
			{ text: "JVM Architecture One Page", link: PATHS.BACKEND_JAVA + "jvm-architecture" },
		],
	},
	{
		text: "Concurrency",
		collapsed: true,
		items: [
			{ text: "Concurrency in Java", link: PATHS.BACKEND_JAVA + "concurrency/" },
			{ text: "Java Memory Model (JMM)", link: PATHS.BACKEND_JAVA + "concurrency/jmm" },
			{ text: "Thread Safety", link: PATHS.BACKEND_JAVA + "concurrency/thread-safety" },
			{ text: "Locks and Synchronization", link: PATHS.BACKEND_JAVA + "concurrency/locks-and-synchronization" },
			{ text: "Executor Service", link: PATHS.BACKEND_JAVA + "concurrency/executor-service" },
			{ text: "Futures and Promises", link: PATHS.BACKEND_JAVA + "concurrency/futures-and-promises" },
		],
	},
	{
		text: "API",
		collapsed: true,
		items: [
			{ text: "Http", link: PATHS.BACKEND_INDEX + "http" },
			{ text: "CORS", link: PATHS.BACKEND_INDEX + "cors" },
			{ text: "REST", link: PATHS.BACKEND_INDEX + "rest" },
			{ text: "OWASP", link: PATHS.BACKEND_INDEX + "owasp" },
		],
	},
	{
		text: "Services",
		collapsed: true,
		items: [
			{ text: "WebServices", link: PATHS.BACKEND_INDEX + "webservices" },
			{ text: "Microservices", link: PATHS.BACKEND_INDEX + "microservices" },
		],
	},
	{
		text: "API Docs",
		collapsed: true,
		items: [
			{ text: "Swagger", link: PATHS.BACKEND_INDEX + "swagger" },
			{ text: "Open API", link: PATHS.BACKEND_INDEX + "openapi" },
		],
	},
	{
		text: "Messaging",
		collapsed: true,
		items: [
			{ text: "Apache Kafka", link: PATHS.BACKEND_INDEX + "kafka" },
			{ text: "Rabbit MQ", link: PATHS.BACKEND_INDEX + "rabbit-mq" },
		],
	},
	{
		text: "Next Steps",
		collapsed: true,
		items: [
			{ text: "References", link: PATHS.BACKEND_JAVA + "refs" },
			{ text: "What's Next?", link: PATHS.BACKEND_JAVA + "whats-next" },
		],
	},
];

export default SIDEBAR_BACKEND_JAVA;
