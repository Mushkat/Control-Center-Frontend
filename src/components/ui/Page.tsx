import type { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './Page.module.css';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

interface PageSectionProps extends PropsWithChildren {
  title?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn(styles.container, className)}>{children}</div>;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.headerTitle}>{title}</h1>
        {description ? <p className={styles.headerDescription}>{description}</p> : null}
      </div>
      {actions ? <div className={styles.headerActions}>{actions}</div> : null}
    </header>
  );
}

export function PageSection({ title, description, actions, className, children }: PageSectionProps) {
  return (
    <section className={cn(styles.section, className)}>
      {(title || description || actions) && (
        <div className={styles.sectionHeader}>
          <div>
            {title ? <h2 className={styles.sectionTitle}>{title}</h2> : null}
            {description ? <p className={styles.sectionDescription}>{description}</p> : null}
          </div>
          {actions ? <div className={styles.sectionActions}>{actions}</div> : null}
        </div>
      )}
      {children}
    </section>
  );
}
