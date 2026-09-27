export type CaseStudy = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  sector: string;
  services: string[];
  stack: string[];
  sections: { heading: string; paragraphs: string[] }[];
  highlights: string[];
};

// Keep client names, data and metrics out unless the client has approved them in writing.
export const caseStudies: CaseStudy[] = [
  {
    slug: "legal-title-ai-platform",
    title: "A high-stakes legal AI platform for U.S. title attorneys",
    seoTitle: "Case Study: Legal Title & Ownership AI Platform",
    description:
      "How we built and scaled an AI-assisted platform for legal title and ownership analysis in the U.S. energy sector — OCR, extraction, source traceability and resilient pipelines.",
    sector: "Legal · U.S. energy",
    services: [
      "applied-genai",
      "scalable-async-systems",
      "web-application-engineering",
      "cloud-devops",
    ],
    stack: [
      "React",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Vector search",
      "OCR",
      "Embeddings",
      "Queues",
      "Docker",
      "AWS",
      "CI/CD",
    ],
    highlights: [
      "Multi-thousand-page documents processed without full restarts on failure",
      "Every extracted value connected back to its source",
      "Specialists review and correct before results become authoritative",
      "Scaled while existing users and data kept operating",
    ],
    sections: [
      {
        heading: "A difficult domain",
        paragraphs: [
          "This is not document management. Professionals reconstruct ownership from recorded legal instruments across decades. Rights can vary by tract, depth, date, ownership basis, reservation and reversion. One missed instrument or incorrect relationship can change the resulting ownership analysis.",
          "The source material is equally difficult: inconsistent scans, long legal documents and composite abstracts containing thousands of pages.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "The platform processes legal documents using OCR and AI-assisted extraction, connects structured information back to its source, and lets specialists review and correct results before they become authoritative.",
          "Users work across structured runsheets, source documents, relationship diagrams, conveyance models, ownership timelines, entity records and reports. The system keeps these views consistent while preserving history and auditability.",
        ],
      },
      {
        heading: "Built to scale safely",
        paragraphs: [
          "Large processing workloads do not sit inside interactive API requests. Document splitting, OCR, extraction, embeddings and other stages run independently and scale separately. The architecture uses queues, durable artefacts, checkpoints, retries, idempotency, duplicate-delivery protection and partial-failure handling. A failed page should not restart a multi-thousand-page job.",
          "We scaled the live application while existing users and data continued to operate, using automated delivery, controlled releases, monitoring, compatibility boundaries and explicit rollback paths.",
        ],
      },
      {
        heading: "What this demonstrates",
        paragraphs: [
          "Models will change, providers will change, and today's impressive capability will become tomorrow's commodity. The durable work is everything around the model: product design, domain context, tools, data, evaluations, human controls, failure recovery, observability, security and cost management.",
          "The stack can change. That engineering discipline does not.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
