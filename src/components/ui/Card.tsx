import type { ElementType, HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/cn';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

export function Card({ as: Component = 'div', className, children, ...props }: PropsWithChildren<CardProps>) {
  return (
    <Component className={cn(styles.card, className)} {...props}>
      {children}
    </Component>
  );
}
