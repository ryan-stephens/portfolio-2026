import { LucideIcon } from 'lucide-react';

interface SkillBadgeProps {
  skill: string;
  variant?: 'default' | 'primary' | 'accent';
  size?: 'sm' | 'md';
}

const variantStyles = {
  default: 'bg-muted/30 text-muted-foreground border-muted/50 hover:bg-muted/50',
  primary: 'bg-primary/20 text-primary border-primary/30 hover:bg-primary/30',
  accent: 'bg-accent/20 text-accent border-accent/30 hover:bg-accent/30',
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
