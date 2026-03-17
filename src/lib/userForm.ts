import type { NewUser } from '@/types/entities';

export interface UserFormErrors {
  fullName?: string;
  account?: string;
  email?: string;
  phone?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const accountRegex = /^[a-zA-Z0-9._-]{3,20}$/;
const phoneRegex = /^\+?[0-9 ()-]{6,20}$/;

export function normalizeUserInput(input: NewUser): NewUser {
  return {
    ...input,
    fullName: input.fullName.trim(),
    account: input.account.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
  };
}

export function validateUserInput(input: NewUser): UserFormErrors {
  const normalized = normalizeUserInput(input);
  const errors: UserFormErrors = {};

  if (normalized.fullName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  if (!accountRegex.test(normalized.account)) {
    errors.account = 'Account should be 3-20 chars and use letters, digits, ., _ or -.';
  }

  if (!emailRegex.test(normalized.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!phoneRegex.test(normalized.phone)) {
    errors.phone = 'Enter a valid phone number.';
  }

  return errors;
}

export function userFormErrors(errors: UserFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
