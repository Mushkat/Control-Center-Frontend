import { ru } from '@/shared/localization/ru';
import type { Group, User } from '@/types/entities';

export type SortDirection = 'asc' | 'desc';

export interface SortState {
  key: 'fullName' | 'account' | 'email' | 'phone' | 'groupName';
  direction: SortDirection;
}

export interface UsersByGroup {
  byGroupId: Map<string, User[]>;
  withoutGroup: User[];
}

const collator = new Intl.Collator('ru', { sensitivity: 'base' });

export function getGroupName(groupId: string | null, groupsById: Map<string, Group>): string {
  if (groupId === null) return ru.common.noGroup;
  return groupsById.get(groupId)?.name ?? ru.common.unknownGroup;
}

export function buildGroupName(users: User[], groupsById: Map<string, Group>): Map<string, string> {
  return new Map(users.map((user) => [user.id, getGroupName(user.groupId, groupsById)]));
}

export function buildUserIndex(
  users: User[],
  groupsById: Map<string, Group>,
  groupName?: Map<string, string>,
): Map<string, string> {
  const cachedNames = groupName ?? buildGroupName(users, groupsById);

  return new Map(
    users.map((user) => {
      const groupName = cachedNames.get(user.id) ?? getGroupName(user.groupId, groupsById);
      const searchable = `${user.fullName}\u0000${user.account}\u0000${user.email}\u0000${user.phone}\u0000${groupName}`
        .toLocaleLowerCase('ru');

      return [user.id, searchable];
    }),
  );
}

export function filterUsers(
  users: User[],
  query: string,
  groupsById: Map<string, Group>,
  searchIndex?: Map<string, string>,
): User[] {
  const normalized = query.trim().toLocaleLowerCase('ru');
  if (!normalized) return users;

  const index = searchIndex ?? buildUserIndex(users, groupsById);
  return users.filter((user) => (index.get(user.id) ?? '').includes(normalized));
}

export function sortUsers(
  users: User[],
  groupsById: Map<string, Group>,
  sort: SortState,
  groupName?: Map<string, string>,
): User[] {
  const direction = sort.direction === 'asc' ? 1 : -1;

  const decorated = users.map((user, index) => {
    const key = sort.key === 'groupName'
      ? (groupName?.get(user.id) ?? getGroupName(user.groupId, groupsById))
      : user[sort.key];

    return { user, index, key };
  });

  decorated.sort((a, b) => {
    const comparison = collator.compare(a.key, b.key);
    if (comparison !== 0) {
      return comparison * direction;
    }

    return a.index - b.index;
  });

  return decorated.map(({ user }) => user);
}

export function groupUsers(users: User[], validGroupIds?: Set<string>): UsersByGroup {
  return users.reduce<UsersByGroup>(
    (acc, user) => {
      if (user.groupId === null || (validGroupIds && !validGroupIds.has(user.groupId))) {
        acc.withoutGroup.push(user);
        return acc;
      }

      const existing = acc.byGroupId.get(user.groupId) ?? [];
      existing.push(user);
      acc.byGroupId.set(user.groupId, existing);
      return acc;
    },
    { byGroupId: new Map(), withoutGroup: [] },
  );
}
