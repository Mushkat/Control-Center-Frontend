import { useEffect, useState, type FormEvent } from 'react';
import { ru } from '@/shared/localization/ru';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { userFormErrors, normalizeUserInput, validateUserInput, type UserFormErrors } from '@/lib/userForm';
import type { Group, NewUser } from '@/types/entities';
import styles from './AddUserForm.module.css';

interface AddUserFormProps {
  mode: 'create' | 'edit';
  groups: Group[];
  isSubmit: boolean;
  submitError: string | null;
  initialValues?: NewUser;
  onSubmit: (payload: NewUser) => Promise<void>;
  onClose: () => void;
}

const initialState: NewUser = {
  fullName: '',
  account: '',
  email: '',
  phone: '',
  groupId: null,
};

export function AddUserForm({
  mode,
  groups,
  isSubmit,
  submitError,
  initialValues,
  onClose,
  onSubmit,
}: AddUserFormProps) {
  const [formData, setFormData] = useState(initialValues ?? initialState);
  const [errors, setErrors] = useState<UserFormErrors>({});

  useEffect(() => {
    setFormData(initialValues ?? initialState);
    setErrors({});
  }, [initialValues, mode]);

  const updateField = <K extends keyof NewUser>(field: K, value: NewUser[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors({});
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateUserInput(formData);
    setErrors(nextErrors);

    if (userFormErrors(nextErrors)) {
      return;
    }

    await onSubmit(normalizeUserInput(formData));

    if (mode === 'create') {
      setFormData(initialState);
    }
    setErrors({});
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="fullName" className={styles.label}>
          {ru.forms.fullName}
        </label>
        <Input
          id="fullName"
          required
          value={formData.fullName}
          onChange={(event) => updateField('fullName', event.target.value)}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
        />
        {errors.fullName ? (
          <p id="fullName-error" className={styles.errorText}>
            {errors.fullName}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="account" className={styles.label}>
          {ru.forms.account}
        </label>
        <Input
          id="account"
          required
          value={formData.account}
          onChange={(event) => updateField('account', event.target.value)}
          aria-invalid={Boolean(errors.account)}
          aria-describedby={errors.account ? 'account-error' : undefined}
          placeholder="ivan.ivanov"
        />
        {errors.account ? (
          <p id="account-error" className={styles.errorText}>
            {errors.account}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className={styles.label}>
          {ru.forms.email}
        </label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(event) => updateField('email', event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          placeholder="name@company.ru"
        />
        {errors.email ? (
          <p id="email-error" className={styles.errorText}>
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="phone" className={styles.label}>
          {ru.forms.phone}
        </label>
        <Input
          id="phone"
          required
          value={formData.phone}
          onChange={(event) => updateField('phone', event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          placeholder="+7 999 123 45 67"
        />
        {errors.phone ? (
          <p id="phone-error" className={styles.errorText}>
            {errors.phone}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="groupId" className={styles.label}>
          {ru.forms.group}
        </label>
        <p className={styles.helperText}>{ru.forms.groupHint}</p>
        <Select
          id="groupId"
          value={formData.groupId === null ? '' : formData.groupId}
          onChange={(event) => updateField('groupId', event.target.value || null)}
        >
          <option value="">{ru.forms.withoutGroup}</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </Select>
      </div>

      {submitError ? (
        <p role="alert" className={styles.alert}>
          {submitError}
        </p>
      ) : null}

      <div className={styles.actions}>
        <Button variant="secondary" type="button" onClick={onClose} disabled={isSubmit}>
          {ru.actions.cancel}
        </Button>
        <Button type="submit" disabled={isSubmit}>
          {isSubmit
            ? (mode === 'create' ? ru.forms.creatingUser : ru.forms.savingChanges)
            : (mode === 'create' ? ru.forms.createUser : ru.forms.saveChanges)}
        </Button>
      </div>
    </form>
  );
}
