export type Service = {
  slug: string;
  name: string;
  /** ~5 words, used in menus. */
  short: string;
  /** <title> — keep under ~60 chars. */
  seoTitle: string;
  /** Meta description — keep ~140–160 chars. */
  description: string;
  summary: string;
  intro: string[];
  whenYouNeedIt: string[];
  whatWeBuild: { title: string; body: string }[];
  outcomes: string[];
  faqs: { q: string; a: string }[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: "applied-genai",
    short: "LLMs in real workflows, with review",
    name: "Applied GenAI Integration",
    seoTitle: "Applied GenAI & LLM Integration Services",
    description:
      "Integrate LLMs into real business workflows with structured outputs, validation, source traceability, evaluation and human review — built for production, not demos.",
    summary:
      "Language and multimodal models integrated into real workflows — with structured outputs, provenance, evaluation and review controls.",
    intro: [
      "Most GenAI projects stall between a promising demo and a system people can depend on. The model call is rarely the hard part. The hard part is everything around it: the data it sees, the shape of what it returns, how you know it is right, and what happens when it is not.",
      "We integrate language and multimodal models into existing products and new workflows using structured outputs, model and tool boundaries, confidence handling, provenance, evaluation and review controls — so AI output becomes a reviewed suggestion before it becomes an authoritative record.",
    ],
    whenYouNeedIt: [
      "You have a working prototype but cannot yet trust its output in production.",
      "Documents, emails or forms need to become structured, validated data.",
      "Users need to see where an extracted value came from before accepting it.",
      "You want to add AI to an existing product without turning it into an uncontrolled experiment.",
    ],
    whatWeBuild: [
      {
        title: "Structured extraction",
        body: "Schema-first outputs with type and semantic validation, explicit handling of missing values, refusals and truncated responses.",
      },
      {
        title: "Source traceability",
        body: "Every extracted value linked back to the page, passage or record it came from, so reviewers can verify rather than trust.",
      },
      {
        title: "Human-in-the-loop review",
        body: "Review queues, correction flows and approval gates that preserve human decisions and never silently overwrite confirmed data.",
      },
      {
        title: "Evaluation & monitoring",
        body: "Baseline datasets, precision/recall-style checks, model and prompt versioning, latency and cost tracking.",
      },
    ],
    outcomes: [
      "AI features that fail visibly and recoverably instead of silently",
      "A model-agnostic integration layer — providers can change without a rewrite",
      "Measurable quality, cost and latency for every AI step",
    ],
    faqs: [
      {
        q: "Which LLM providers do you work with?",
        a: "We are not tied to a single provider. We choose models based on the task, data sensitivity, latency, cost and your existing environment, and keep a boundary in the code so the model can be swapped later.",
      },
      {
        q: "How do you stop an LLM from producing wrong data?",
        a: "You cannot make a model infallible, so we design around that: schema validation, semantic checks, confidence handling, source evidence and a human review step before model output becomes an authoritative record.",
      },
      {
        q: "Can you add AI to our existing product?",
        a: "Yes. Most of our GenAI work is integration into an existing workflow. We start by identifying where automation genuinely helps and where a person should stay in control.",
      },
    ],
    related: ["agentic-automation", "backend-data-systems", "scalable-async-systems"],
  },
  {
    slug: "agentic-automation",
    short: "Bounded agents that act safely",
    name: "Agentic Automation",
    seoTitle: "Agentic AI & Workflow Automation Development",
    description:
      "Bounded AI agents that plan steps, use approved tools, keep durable state, verify their work, escalate uncertainty and resume interrupted jobs safely.",
    summary:
      "Bounded agents that plan, use approved tools, keep durable state, verify work, escalate uncertainty and resume interrupted jobs.",
    intro: [
      "An agent is software that is allowed to decide its next step. That is powerful, and it is also exactly why it needs boundaries. We design agentic systems that understand a goal, plan steps, use approved tools, maintain durable state, verify their work, escalate uncertainty and resume interrupted jobs.",
      "We also tell you when you do not need an agent. A deterministic workflow or a single LLM step is often cheaper, faster and easier to trust — we compare the options against a baseline before adding autonomy.",
    ],
    whenYouNeedIt: [
      "A multi-step process requires judgement across several systems or documents.",
      "Staff spend hours gathering context before they can make a decision.",
      "You need automation that can stop, ask for approval, and pick up where it left off.",
      "An existing agent prototype is unpredictable, expensive or impossible to debug.",
    ],
    whatWeBuild: [
      {
        title: "Tool design & permissions",
        body: "Typed tool inputs, server-side validation, read/write separation and least privilege — the agent acts with the requesting user's permissions, never a database bypass.",
      },
      {
        title: "Approval gates",
        body: "Consequential actions require explicit approval of the exact proposed operation, validated outside the model.",
      },
      {
        title: "Durable state & recovery",
        body: "Checkpoints, stop conditions and failure budgets so long-running work can be interrupted, inspected and resumed.",
      },
      {
        title: "Tracing & evaluation",
        body: "Correlated traces of retrieval, tool calls, model versions, latency and cost, plus task-level evaluation and adversarial tests.",
      },
    ],
    outcomes: [
      "Automation with a clear, auditable boundary of authority",
      "Agents that can be interrupted, inspected and resumed",
      "An honest decision on where an agent is — and is not — justified",
    ],
    faqs: [
      {
        q: "What is the difference between an AI workflow and an AI agent?",
        a: "A workflow follows steps you define in advance, with models used inside some steps. An agent chooses its own next step and tools. Agents add flexibility but also cost and risk, so we only recommend them when that flexibility improves the outcome.",
      },
      {
        q: "How do you keep an agent safe?",
        a: "By constraining what it can do rather than hoping it behaves: scoped tools, the user's own permissions, approvals for consequential writes, budgets, stop conditions and full traces of every action.",
      },
      {
        q: "Do you use MCP or agent frameworks?",
        a: "Where they help. We use direct tool-calling, orchestration frameworks and MCP integrations as appropriate, but authorisation and validation always live in your system, not in the framework.",
      },
    ],
    related: ["applied-genai", "scalable-async-systems", "quality-security-reliability"],
  },
  {
    slug: "product-workflow-engineering",
    short: "Complex processes, turned into product",
    name: "Product & Workflow Engineering",
    seoTitle: "Product & Workflow Engineering for Complex Domains",
    description:
      "We translate complex business processes into user journeys, data models, business rules, APIs and interfaces — for domains where the workflow is the hard part.",
    summary:
      "Business processes translated into user journeys, data models, business rules, APIs, interfaces and operational workflows.",
    intro: [
      "Some products are hard not because of the interface, but because of the domain: specialist terminology, rules with exceptions, and decisions where one missed detail changes the result.",
      "We translate those business processes into user journeys, data models, business rules, APIs, interfaces, validation rules and operational workflows — working with your domain experts until the software reflects how the work is actually done.",
    ],
    whenYouNeedIt: [
      "Your process lives in spreadsheets, email threads and a few experts' heads.",
      "Off-the-shelf tools cannot represent your domain's rules.",
      "You are starting a new product and need the first version scoped correctly.",
    ],
    whatWeBuild: [
      {
        title: "Discovery & workflow mapping",
        body: "Who does what, with which data, and where the bottlenecks and failure modes are.",
      },
      {
        title: "Domain & data modelling",
        body: "Relational models and business rules that capture the domain precisely, including history and auditability.",
      },
      {
        title: "Scoped first release",
        body: "The smallest production-ready version worth building, with a clear path for what comes next.",
      },
    ],
    outcomes: [
      "Software that matches how the work is really done",
      "A data model that can survive new requirements",
      "A realistic, staged delivery plan",
    ],
    faqs: [
      {
        q: "Do you only build AI products?",
        a: "No. AI is one tool. Many problems are better solved with well-designed conventional software, and we will say so.",
      },
      {
        q: "How do you start a new product engagement?",
        a: "Usually with a focused discovery workshop to agree the business outcome, current process, data, constraints and the smallest production-ready version worth building.",
      },
    ],
    related: ["web-application-engineering", "backend-data-systems", "applied-genai"],
  },
  {
    slug: "web-application-engineering",
    short: "Workspaces experts use all day",
    name: "Web & Application Engineering",
    seoTitle: "Custom Web Application Development",
    description:
      "Modern web applications and specialist workspaces — dashboards, editable data, document review, reporting, real-time updates and complex user interactions.",
    summary:
      "Modern web apps and specialist workspaces with dashboards, editable data, document review, reporting and real-time updates.",
    intro: [
      "Professional users do not need another generic dashboard. They need a workspace that fits their job: dense data they can edit safely, documents they can review side by side, and views that stay consistent as work changes underneath them.",
      "We build modern web applications and specialist workspaces with dashboards, editable data, document review, reporting, real-time updates and complex user interactions.",
    ],
    whenYouNeedIt: [
      "Users work across several linked views of the same data.",
      "Reviewers need documents and extracted data side by side.",
      "Your current UI cannot keep up with the complexity of the work.",
    ],
    whatWeBuild: [
      {
        title: "Specialist workspaces",
        body: "Data grids, document viewers, relationship diagrams, timelines and reports that stay consistent with each other.",
      },
      {
        title: "Real-time & long-running UX",
        body: "Progress, reconnects, cancellation and partial results for work that takes longer than a request.",
      },
      {
        title: "Access control",
        body: "Role-based permissions enforced on the server, never only in the interface.",
      },
    ],
    outcomes: [
      "Interfaces experts can work in all day",
      "Consistent views over shared, audited data",
      "Front-ends that make long-running AI work understandable",
    ],
    faqs: [
      {
        q: "Which front-end stack do you use?",
        a: "Our hands-on experience is largely React and TypeScript, but we work within your existing stack when that is sensible.",
      },
    ],
    related: ["product-workflow-engineering", "backend-data-systems"],
  },
  {
    slug: "backend-data-systems",
    short: "APIs, data models and search",
    name: "Backend & Data Systems",
    seoTitle: "Backend, API & Data Systems Engineering",
    description:
      "Service layers, APIs, relational data models, search and vector capabilities, background jobs and integrations — designed around the needs of the product.",
    summary:
      "Service layers, APIs, relational data models, search/vector capabilities, background jobs and integrations.",
    intro: [
      "The backend is where a product's reliability is decided. We design service layers, APIs, relational data models, search and vector capabilities, background jobs and integrations around the needs of the product — not around a fashionable architecture.",
    ],
    whenYouNeedIt: [
      "You need a clean API and data model for a new product.",
      "Search — keyword, semantic or hybrid — is central to the experience.",
      "Integrations with external systems are brittle or undocumented.",
    ],
    whatWeBuild: [
      {
        title: "APIs & service layers",
        body: "Typed, validated APIs with clear boundaries between validation errors and application failures.",
      },
      {
        title: "Data & search",
        body: "PostgreSQL data models with migrations, full-text and vector search, and hybrid retrieval where it helps.",
      },
      {
        title: "Integrations",
        body: "Reliable connections to third-party systems with retries, idempotency and observability.",
      },
    ],
    outcomes: [
      "A data model you can extend with confidence",
      "Search that finds what users actually mean",
      "Integrations that fail loudly and recover cleanly",
    ],
    faqs: [
      {
        q: "Do you work with vector databases?",
        a: "Yes — including vector search inside PostgreSQL. We choose between keyword, vector and hybrid retrieval based on evaluation, not assumption.",
      },
    ],
    related: ["scalable-async-systems", "applied-genai", "cloud-devops"],
  },
  {
    slug: "scalable-async-systems",
    short: "Pipelines that survive failure",
    name: "Scalable & Asynchronous Systems",
    seoTitle: "Scalable Document Processing & Async Pipelines",
    description:
      "Queues, workers, events, checkpoints and retries for long-running and high-volume workloads like OCR, extraction and embeddings — so one failure never restarts the job.",
    summary:
      "Queues, workers, events, checkpoints and retries that separate interactive requests from expensive background processing.",
    intro: [
      "Document splitting, OCR, extraction and embeddings do not belong inside an interactive API request. We separate interactive user requests from expensive background processing and use queues, workers, events, checkpoints and retries where appropriate.",
      "The goal is simple to state and hard to build: a failed page should not restart a multi-thousand-page job.",
    ],
    whenYouNeedIt: [
      "Large jobs time out, stall or restart from scratch after a failure.",
      "You process thousands of pages or records per job.",
      "Processing stages need to scale independently.",
    ],
    whatWeBuild: [
      {
        title: "Pipelines with checkpoints",
        body: "Page- and chunk-level work with fan-out/fan-in, versioned stage outputs and targeted retries.",
      },
      {
        title: "Idempotency & delivery safety",
        body: "Duplicate-delivery protection and idempotent handlers so retries never double-apply work.",
      },
      {
        title: "Durable job state",
        body: "Job status that survives disconnects and restarts, surfaced to users accurately.",
      },
    ],
    outcomes: [
      "Throughput that scales with demand",
      "Partial failures that stay partial",
      "Predictable cost per document",
    ],
    faqs: [
      {
        q: "Do we need microservices for this?",
        a: "Not necessarily. We usually start with the existing application plus a separate worker, and split services only when independent scaling or failure isolation creates a real reason.",
      },
    ],
    related: ["backend-data-systems", "applied-genai", "cloud-devops"],
  },
  {
    slug: "cloud-devops",
    short: "Releases without the drama",
    name: "Cloud, DevOps & Production Delivery",
    seoTitle: "Cloud, DevOps & Production Delivery",
    description:
      "Deployment pipelines, containerised services, cloud infrastructure, monitoring, controlled releases, migrations and rollback paths for systems with live users.",
    summary:
      "Deployment pipelines, containers, cloud infrastructure, monitoring, controlled releases, migrations and rollback paths.",
    intro: [
      "Shipping once is easy. Changing a live system safely, while existing users and data keep working, is the real test. We design deployment pipelines, containerised services, cloud infrastructure, monitoring, security, controlled releases, migration procedures and rollback paths.",
    ],
    whenYouNeedIt: [
      "Releases are manual, risky or infrequent.",
      "You are scaling a live application and cannot afford downtime.",
      "Nobody is sure how to roll back a bad deploy.",
    ],
    whatWeBuild: [
      {
        title: "CI/CD",
        body: "Automated build, test and release pipelines with environment promotion.",
      },
      {
        title: "Infrastructure",
        body: "Containerised services on cloud infrastructure sized for your workload.",
      },
      {
        title: "Safe change",
        body: "Compatibility boundaries, controlled releases, data migrations and explicit rollback paths.",
      },
    ],
    outcomes: [
      "Frequent, boring releases",
      "Visibility into what production is doing",
      "A tested way back from every change",
    ],
    faqs: [
      {
        q: "Which cloud do you use?",
        a: "Our hands-on experience is strongest on AWS, but we are not tied to one provider and will work within your existing environment.",
      },
    ],
    related: ["quality-security-reliability", "scalable-async-systems"],
  },
  {
    slug: "quality-security-reliability",
    short: "Tested, secured, observable",
    name: "Quality, Security & Reliability",
    seoTitle: "Software Quality, Security & Reliability Engineering",
    description:
      "Testing, validation, authorisation, secrets management, observability, idempotency, failure recovery and operational documentation for production systems.",
    summary:
      "Testing, validation, authorisation, secrets management, observability, idempotency, failure recovery and documentation.",
    intro: [
      "Reliability is a property of the whole system, not a phase at the end. We combine testing, validation, authorisation, secrets management, observability, idempotency, failure recovery and operational documentation from the start.",
    ],
    whenYouNeedIt: [
      "Incidents are hard to diagnose because nothing is traced.",
      "Authorisation is enforced inconsistently across the product.",
      "You are preparing for a security review or enterprise customer.",
    ],
    whatWeBuild: [
      {
        title: "Test strategy",
        body: "Unit, integration and browser tests focused on the flows that matter.",
      },
      {
        title: "Security baseline",
        body: "Server-side authorisation, protected configuration and secrets, and least-privilege access.",
      },
      {
        title: "Observability",
        body: "Structured logs, traces and correlation IDs from user action to background job.",
      },
    ],
    outcomes: [
      "Fewer incidents, faster diagnosis",
      "Security that holds up to review",
      "Documentation your team can operate from",
    ],
    faqs: [
      {
        q: "Can you audit an existing system?",
        a: "Yes. A reliability or architecture review is often a good first engagement: we identify bottlenecks, risky failure modes and the highest-value fixes.",
      },
    ],
    related: ["cloud-devops", "agentic-automation"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/** Engagement models from the brief — used on /services and the home page. */
export const engagements = [
  {
    name: "New product development",
    body: "From discovery to a production-ready first release, with a practical path for future change.",
  },
  {
    name: "GenAI workflow integration",
    body: "Add useful AI capabilities to an existing workflow without turning the product into an uncontrolled AI experiment.",
  },
  {
    name: "Agentic automation",
    body: "Build bounded, tool-using workflows with state, verification, approval gates and recovery.",
  },
  {
    name: "Scalability & reliability",
    body: "Find bottlenecks, separate workloads, improve throughput, strengthen recovery and reduce operational risk.",
  },
  {
    name: "Modernisation",
    body: "Improve or replace parts of an existing product through controlled, incremental changes.",
  },
  {
    name: "Dedicated engineering partnership",
    body: "Work as an engineering team alongside your business, product and technical stakeholders.",
  },
];

export const discoveryQuestions = [
  "What business outcome are we trying to achieve?",
  "What does the current process look like?",
  "Who uses the process and where are the bottlenecks?",
  "What data, documents, systems and external tools are involved?",
  "Where should automation help, and where should a human remain in control?",
  "What are the important failure modes and security constraints?",
  "What scale, latency and cost expectations exist?",
  "What is the smallest production-ready version worth building?",
];
