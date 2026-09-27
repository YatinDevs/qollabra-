import {
  Bot,
  Boxes,
  Cloud,
  Database,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideProps,
} from "lucide-react";

const icons = {
  "applied-genai": Sparkles,
  "agentic-automation": Bot,
  "product-workflow-engineering": Workflow,
  "web-application-engineering": LayoutDashboard,
  "backend-data-systems": Database,
  "scalable-async-systems": Boxes,
  "cloud-devops": Cloud,
  "quality-security-reliability": ShieldCheck,
} as const;

export function ServiceIcon({ slug, ...props }: { slug: string } & LucideProps) {
  const Icon = icons[slug as keyof typeof icons] ?? Sparkles;
  return <Icon aria-hidden strokeWidth={1.75} {...props} />;
}
