import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import styles from './Input.module.css';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(styles.input, className)} {...props} />;
}
