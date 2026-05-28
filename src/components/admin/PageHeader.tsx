import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export default function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--color-rule)]/70 pb-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-[var(--color-ink)]">{title}</h1>
        {description && (
          <p className="mt-1 font-body text-[var(--color-ink-soft)]">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
