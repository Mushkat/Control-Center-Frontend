import { ru } from '@/shared/localization/ru';
import { Button } from '@/components/ui/Button';
import type { User } from '@/types/entities';
import styles from './DeleteConfirm.module.css';

interface DeleteConfirmProps {
  user: User;
  isSubmitting: boolean;
  errorMessage: string | null;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

export function DeleteConfirm({ user, isSubmitting, errorMessage, onCancel, onConfirm }: DeleteConfirmProps) {
  return (
    <div className={styles.root}>
      <div className={styles.warningBox}>
        <p className={styles.warningTitle}>{ru.modal.deleteQuestion}</p>
        <p className={styles.warningText}>
          <span className={styles.userName}>{user.fullName}</span>. {ru.modal.deleteDescription}
        </p>
      </div>

      {errorMessage ? (
        <p role="alert" className={styles.alert}>
          {errorMessage}
        </p>
      ) : null}

      <div className={styles.actions}>
        <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          {ru.actions.cancel}
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isSubmitting}>
          {isSubmitting ? ru.modal.deleting : ru.modal.deleteUserAction}
        </Button>
      </div>
    </div>
  );
}
