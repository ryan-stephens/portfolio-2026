interface SkillBadgeProps {
  skill: string;
  variant?: 'default' | 'primary' | 'accent';
  size?: 'sm' | 'md';
}

const variantStyles = {
  default: 'bg-muted/40 text-foreground border-muted/60 hover:bg-muted/50',
  primary: 'bg-primary/25 text-primary dark:text-white border-primary/50 hover:bg-primary/35',
  accent: 'bg-accent/25 text-accent dark:text-white border-accent/50 hover:bg-accent/35',
};

const sizeStyles = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
};

export default function SkillBadge({
  skill,
  variant = 'default',
  size = 'sm',
}: SkillBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full border transition-all duration-200 cursor-default ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {skill}
    </span>
  );
}
