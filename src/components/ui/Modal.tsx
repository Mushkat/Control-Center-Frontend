import { useEffect, useId, type PropsWithChildren } from 'react';
import { ru } from '@/shared/localization/ru';
import { Button } from '@/components/ui/Button';
import styles from './Modal.module.css';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ title, isOpen, onClose, children }: PropsWithChildren<ModalProps>) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={onClose}>
      <div className={styles.panel} onClick={(event) => event.stopPropagation()}>
        <div className={styles.header}>
          <h3 id={titleId} className={styles.title}>
            {title}
          </h3>
          <Button variant="ghost" onClick={onClose} aria-label={ru.actions.closeModal}>
            ✕
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
