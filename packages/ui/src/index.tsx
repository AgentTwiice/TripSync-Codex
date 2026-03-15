import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";

type ClassValue = string | false | null | undefined;

function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}

const interactiveTransition =
  "transition-[opacity,box-shadow,transform] duration-150 ease-out motion-reduce:transform-none motion-reduce:transition-none";

const focusVisibleRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:ring-sky";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  asChild?: boolean;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ asChild, variant = "primary", className, children, ...props }: ButtonProps) {
  const variantClassName =
    variant === "secondary"
      ? "border border-line/80 bg-ink/30 text-sand hover:bg-ink/45"
      : "bg-sky text-ink hover:bg-sky/90";

  const sharedClassName = cn(
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold",
    "active:-translate-y-px hover:-translate-y-px hover:shadow-lift",
    focusVisibleRing,
    interactiveTransition,
    variantClassName,
    className
  );

  if (asChild) {
    const child = Children.only(children);

    if (!isValidElement(child)) {
      return null;
    }

    const element = child as ReactElement<{ className?: string }>;
    return cloneElement(element, {
      className: cn(sharedClassName, element.props.className)
    });
  }

  return (
    <button className={sharedClassName} type="button" {...props}>
      {children}
    </button>
  );
}

type SurfaceProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "section" | "div";
};

export function Surface({ as = "article", className, ...props }: SurfaceProps) {
  const Component = as;

  return (
    <Component
      className={cn(
        "rounded-[28px] border border-line/80 bg-ink/55 p-6 text-sand shadow-soft",
        "hover:-translate-y-px hover:shadow-lift",
        interactiveTransition,
        className
      )}
      {...props}
    />
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  hint?: string;
  className?: string;
};

export function MetricCard({ label, value, hint, className }: MetricCardProps) {
  return (
    <article
      className={cn(
        "rounded-3xl border border-line/70 bg-ink/55 p-5 text-sand shadow-soft",
        "hover:-translate-y-px hover:shadow-lift",
        interactiveTransition,
        className
      )}
    >
      <p className="text-xs uppercase tracking-[0.16em] text-mist/80">{label}</p>
      <p className="mt-2 font-display text-3xl">{value}</p>
      {hint ? <p className="mt-2 text-sm text-mist">{hint}</p> : null}
    </article>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: {
    href: string;
    label: string;
  };
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, cta, className }: SectionHeadingProps) {
  return (
    <header className={cn("space-y-3", className)}>
      {eyebrow ? <p className="text-xs uppercase tracking-[0.18em] text-mist/80">{eyebrow}</p> : null}
      <h2 className="max-w-3xl font-display text-3xl text-sand md:text-4xl">{title}</h2>
      {description ? <p className="max-w-2xl text-sm leading-6 text-mist">{description}</p> : null}
      {cta ? (
        <a
          className={cn(
            "inline-flex items-center gap-1 text-sm font-semibold text-sky hover:opacity-85",
            "active:-translate-y-px hover:-translate-y-px",
            focusVisibleRing,
            interactiveTransition
          )}
          href={cta.href}
        >
          {cta.label}
        </a>
      ) : null}
    </header>
  );
}

type AppShellProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function AppShell({ children, className, ...props }: AppShellProps) {
  return (
    <div className={cn("min-h-screen bg-ink text-sand", className)} {...props}>
      {children}
    </div>
  );
}

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;
