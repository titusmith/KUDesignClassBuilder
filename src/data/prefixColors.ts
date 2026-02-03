// Color assignments for course prefixes - used in sidebar dots, grid card outlines, and scheduled fill
export const PREFIX_COLORS: Record<
  string,
  { dot: string; border: string; borderMuted: string; fill: string }
> = {
  ADS: { dot: "bg-blue-500", border: "border-blue-500", borderMuted: "border-blue-500/15", fill: "bg-blue-500/15" },
  ANIM: { dot: "bg-emerald-500", border: "border-emerald-500", borderMuted: "border-emerald-500/15", fill: "bg-emerald-500/15" },
  INDD: { dot: "bg-violet-500", border: "border-violet-500", borderMuted: "border-violet-500/15", fill: "bg-violet-500/15" },
  ILLU: { dot: "bg-amber-500", border: "border-amber-500", borderMuted: "border-amber-500/15", fill: "bg-amber-500/15" },
  IXD: { dot: "bg-teal-500", border: "border-teal-500", borderMuted: "border-teal-500/15", fill: "bg-teal-500/15" },
  VISC: { dot: "bg-rose-500", border: "border-rose-500", borderMuted: "border-rose-500/15", fill: "bg-rose-500/15" },
  BDS: { dot: "bg-fuchsia-500", border: "border-fuchsia-500", borderMuted: "border-fuchsia-500/15", fill: "bg-fuchsia-500/15" },
};

export function getPrefixColor(prefix: string) {
  return PREFIX_COLORS[prefix] ?? { dot: "bg-muted-foreground/50", border: "border-border", borderMuted: "border-muted-foreground/15", fill: "bg-muted-foreground/10" };
}
