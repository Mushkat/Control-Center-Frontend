import type { Group, NewUser, User } from '@/types/entities';

interface RawGroup {
  id: number | string;
  name: string;
  description: string;
}

interface RawUser {
  id: number | string;
  fullName: string;
  account: string;
  email: string;
  phone: string;
  groupId?: number | string | null;
}

function normalizeGroupId(groupId: number | string | null | undefined): string | null {
  if (groupId === null || groupId === undefined || groupId === '') {
    return null;
  }

  return String(groupId);
}

export function normalizeGroup(group: RawGroup): Group {
  return {
    ...group,
    id: String(group.id),
  };
}

export function normalizeUser(user: RawUser): User {
  return {
    ...user,
    id: String(user.id),
    groupId: normalizeGroupId(user.groupId),
  };
}

export function normalizeNewUser(input: NewUser): NewUser {
  return {
    ...input,
    groupId: normalizeGroupId(input.groupId),
  };
}
