import { ru } from '@/shared/localization/ru';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/cn';
import styles from './States.module.css';

interface StateProps {
  title: string;
  description: string;
}

export function LoadingState() {
  return (
    <Card role="status" aria-live="polite" className={styles.card}>
      <p className={cn(styles.title, styles.loadTitle)}>{ru.states.loadingTitle}</p>
      <p className={cn(styles.description, styles.loadDescription)}>{ru.states.loadingDescription}</p>
    </Card>
  );
}

export function ErrorState({ title, description }: StateProps) {
  return (
    <Card role="alert" className={cn(styles.card, styles.error)}>
      <h3 className={cn(styles.title, styles.errorTitle)}>{title}</h3>
      <p className={cn(styles.description, styles.errorDescription)}>{description}</p>
    </Card>
  );
}

export function EmptyState({ title, description }: StateProps) {
  return (
    <Card className={cn(styles.card, styles.empty)}>
      <h3 className={cn(styles.title, styles.emptyTitle)}>{title}</h3>
      <p className={cn(styles.description, styles.emptyDescription)}>{description}</p>
    </Card>
  );
}
