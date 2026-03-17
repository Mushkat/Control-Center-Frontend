import { request } from '@/api/http';
import { normalizeGroup } from '@/lib/entitiesAdapters';
import { localizeGroup } from '@/shared/localization/groups';
import type { Group } from '@/types/entities';

export const groupsApi = {
  getGroups: async () => {
    const groups = await request<Group[]>('/groups');
    return groups.map(normalizeGroup).map(localizeGroup);
  },
};
