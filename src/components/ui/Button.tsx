import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/cn';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'dangerSoft' | 'ghost';
}

export function Button({ variant = 'primary', className, children, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <button className={cn(styles.button, styles[variant], className)} {...props}>
      {children}
    </button>
  );
}
