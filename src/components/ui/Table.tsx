import type { HTMLAttributes, PropsWithChildren, TableHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import styles from './Table.module.css';

export function TableContainer({ className, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn(styles.container, className)} {...props}>
      {children}
    </div>
  );
}

export function TableScroll({ className, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn(styles.scroll, className)} {...props}>
      {children}
    </div>
  );
}

export function Table({ className, children, ...props }: PropsWithChildren<TableHTMLAttributes<HTMLTableElement>>) {
  return (
    <table className={cn(styles.table, className)} {...props}>
      {children}
    </table>
  );
}
