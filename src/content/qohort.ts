// Public programme content for Qohort. Source: the internal strategy plan (v2.0, 9 Sep 2026).
// Deliberately excluded: fees (not yet approved), cost model, internal owners, and the reference project.
// Do not add salary, placement or accreditation claims.

export type Tier = {
  slug: string;
  number: 1 | 2 | 3;
  name: string;
  seoTitle: string;
  description: string;
  purpose: string;
  forWho: string;
  entry: string;
  exit: string;
  hoursPerWeek: string;
  scope: string[];
  exitEvidence: string[];
  credential: string;
  roleDirection: string;
};

export const tiers: Tier[] = [
  {
    slug: "full-stack-foundations",
    number: 1,
    name: "Full-stack Software Foundations",
    seoTitle: "Full-stack Software Foundations (Tier 1) — Qohort",
    description:
      "A 12-week supervised programme to go from basic programming to building, testing and deploying a role-based full-stack application with React, FastAPI and PostgreSQL.",
    purpose:
      "Move from basic programming to a complete, deployed application — requirements, data model, API, UI, tests and deployment, connected.",
    forWho:
      "Final-year CS, IT, AI/DS and allied-branch students, and self-taught builders, who can code but have not yet shipped a complete application.",
    entry:
      "Basic programming and debugging; able to work with files, functions and simple data structures. Starts with a setup and coding diagnostic.",
    exit: "Build, test and deploy a role-based CRUD application independently.",
    hoursPerWeek: "16–20 total hours/week, including 6 live hours",
    scope: [
      "Engineering workflow: Git, branches, pull requests, issues and acceptance criteria",
      "Python and FastAPI; REST, HTTP and browser behaviour",
      "React with a consistent JavaScript/TypeScript baseline",
      "PostgreSQL, SQLAlchemy and migrations",
      "Authentication and role-based authorisation",
      "Unit, API and browser tests",
      "Docker, configuration, secrets and a simple cloud deployment",
      "Responsible, disclosed use of AI coding assistants",
    ],
    exitEvidence: [
      "A working application with separate role permissions and validated flows",
      "A readable repository with migrations, tests and documented setup",
      "A deployment a reviewer can access and reproduce",
      "A live change implemented across database, API and UI during review",
    ],
    credential: "Full-stack Software Foundations",
    roleDirection:
      "Junior full-stack/backend roles or internships, subject to each employer's hiring bar.",
  },
  {
    slug: "llm-integrations-automation",
    number: 2,
    name: "LLM Integrations & Automation",
    seoTitle: "LLM Integrations & Automation (Tier 2) — Qohort",
    description:
      "12 weeks of supervised practice adding evaluated LLM features, structured extraction and reliable background processing to a deployed application.",
    purpose:
      "Extend a deployed application with AI-assisted data processing and reliable asynchronous workflows. The emphasis is dependable integration, not simply getting a model response.",
    forWho:
      "Developers with 2–4 years of experience moving into applied AI, and students who pass the Tier 1 exit bar or an equivalent assessment.",
    entry:
      "Tier 1 exit capability or equivalent: React/API/SQL competence, Git, Docker and a simple deployment — shown through a deployed application, a database/API task and live debugging.",
    exit: "Add evaluated LLM features and reliable background processing to an application.",
    hoursPerWeek: "16–20 total hours/week, including 6 live hours",
    scope: [
      "LLM foundations: tokens, context, embeddings, limitations and task decomposition",
      "Direct model APIs and a small provider-agnostic interface",
      "Structured outputs, schema validation and semantic checks",
      "PDF extraction, OCR and vision trade-offs; document provenance",
      "Jobs, state transitions, queues and workers",
      "Server-sent events, retries and idempotency",
      "Baseline evaluation, logging and cost tracking",
      "Human review before AI output becomes authoritative",
    ],
    exitEvidence: [
      "Explain the full processing lifecycle of an AI-assisted job",
      "Distinguish extraction quality from schema validity",
      "Handle duplicate work and recover from a failed worker",
      "Preserve human corrections and show evidence for extracted values",
    ],
    credential: "LLM Application Engineering",
    roleDirection:
      "AI-enabled full-stack/backend engineering or junior applied-AI work, depending on demonstrated depth and prior experience.",
  },
  {
    slug: "agentic-ai-scalable-systems",
    number: 3,
    name: "Agentic AI & Scalable Systems",
    seoTitle: "Agentic AI & Scalable Systems (Tier 3) — Qohort",
    description:
      "A 12-week advanced programme on building bounded, permission-aware agentic systems with retrieval, tool use, approvals, tracing, evaluation and cost control.",
    purpose:
      "Build AI systems that retrieve information, use tools and complete bounded workflows while remaining inspectable, permission-aware and recoverable. Learn when an agent is warranted before learning how to add one.",
    forWho:
      "Developers who already have structured LLM integration, asynchronous processing, validation and deployment experience.",
    entry:
      "Tier 2 exit capability or equivalent: structured extraction, model error handling, durable jobs and basic evaluation. Full-stack experience alone does not meet this bar.",
    exit: "Build and operate a bounded, permission-aware agentic system with measurable quality.",
    hoursPerWeek: "18–22 total hours/week, including 6 live hours",
    scope: [
      "Workflow versus agent: tool loops, stop conditions and failure budgets",
      "Tool design, permission boundaries and least privilege",
      "SQL and permission-aware retrieval, pgvector, hybrid search and agentic RAG",
      "Orchestration with LangGraph; bounded MCP interoperability",
      "Persistent state, approvals, streaming and interruption",
      "Tracing, evaluation, cost controls and adversarial testing",
      "An independent, non-trivial capstone with a named stakeholder",
    ],
    exitEvidence: [
      "A non-agent baseline and a justified architecture decision",
      "Tests proving unauthorised tools or resources fail",
      "Traces linking a user task to retrieval, tool calls and outcome",
      "An operational defence of the independent capstone",
    ],
    credential: "Agentic AI & Scalable Systems",
    roleDirection:
      "Applied AI, AI product, LLM or AI backend engineering — seniority remains experience-dependent.",
  },
];

export function getTier(slug: string) {
  return tiers.find((t) => t.slug === slug);
}

export const weeklyFormat = [
  { label: "Instruction & design", hours: "2 live hours", body: "Decisions, concepts and worked examples." },
  { label: "Guided implementation", hours: "3 live hours", body: "Build with mentor support — about one mentor per 6–8 learners." },
  { label: "Engineering review", hours: "1 live hour", body: "Debugging, architecture review and project defence." },
  { label: "Individual feedback", hours: "Weekly", body: "At least one reviewed pull request per learner per week." },
];

export const seminars = [
  {
    title: "AI-Assisted SDLC: The Changing Practice of Software Engineering",
    question: "When AI can generate code, what remains the engineer's responsibility?",
    takeaway: "An AI-assisted development review checklist.",
  },
  {
    title: "Evolving Software Roles: Understanding Job Descriptions and Hiring Signals",
    question: "How should a candidate interpret a role asking for backend, cloud, AI and product understanding?",
    takeaway: "A requirement → capability → evidence map for your résumé.",
  },
  {
    title: "AI Engineering as a Career: Roles, Prerequisites and Entry Pathways",
    question: "What does an AI engineer do, and how can someone with my background enter the field?",
    takeaway: "A role-and-skills map and an honest next-step recommendation.",
  },
  {
    title: "From Academic Projects to Production Software: Defining Job Readiness",
    question: "What separates a completed project from evidence that someone can contribute to an engineering team?",
    takeaway: "A project-review scorecard.",
  },
  {
    title: "Technical Interviews in the AI Era: Demonstrating Engineering Competence",
    question: "How can candidates show their own ability when AI can help produce polished code?",
    takeaway: "A project-defence framework.",
  },
  {
    title: "Agentic AI in Practice: Autonomy, Reliability and Responsible Engineering",
    question: "What must be established before an AI system is allowed to act?",
    takeaway: "A framework for deciding when an agent is justified and how to constrain it.",
  },
];

export const qohortFaqs = [
  {
    q: "Do I have to start at Tier 1?",
    a: "No. Each tier can be entered directly after passing its entry assessment, and each can be completed as a standalone capability.",
  },
  {
    q: "How long is the programme?",
    a: "Each tier is 12 teaching weeks. The full three-tier pathway is 36 taught weeks, typically 9–12 calendar months including breaks and assessment windows.",
  },
  {
    q: "Is it online or in person?",
    a: "Live sessions are scheduled every week. Our initial catchment is Pune, PCMC, Moshi and Alandi, with online participation — confirm the format for each intake on the application page.",
  },
  {
    q: "Can I use AI coding assistants?",
    a: "Yes, with disclosure. You remain responsible for your tests and changes, and assessments include unaided code-reading and debugging segments.",
  },
  {
    q: "Do you guarantee a job or placement?",
    a: "No. We provide supervised practice, assessed evidence of your capability and structured job-search support. Hiring decisions remain with employers.",
  },
  {
    q: "What does the credential mean?",
    a: "A Qollabra competency credential records the tier, assessment date and evidence of what you demonstrated. It is not a university degree or government-accredited diploma.",
  },
];
