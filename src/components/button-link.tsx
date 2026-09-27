import Link from "next/link";

type Variant = "primary" | "secondary" | "qohort";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-charcoal",
  secondary: "border border-ink/20 text-ink hover:border-ink",
  qohort: "bg-brand text-q-bg hover:bg-white font-mono",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
