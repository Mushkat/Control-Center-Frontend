import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/cn';
import styles from './Badge.module.css';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'brand' | 'danger';
}

export function Badge({ tone = 'neutral', className, children, ...props }: PropsWithChildren<BadgeProps>) {
  return (
    <span className={cn(styles.badge, styles[tone], className)} {...props}>
      {children}
    </span>
  );
}
