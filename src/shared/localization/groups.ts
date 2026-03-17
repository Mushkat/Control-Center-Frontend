import { ru } from '@/shared/localization/ru';
import type { Group } from '@/types/entities';

export function localizeGroup(group: Group): Group {
  const localizedGroup = ru.groups.catalog[group.id as keyof typeof ru.groups.catalog];

  if (!localizedGroup) {
    return group;
  }

  return {
    ...group,
    name: localizedGroup.name,
    description: localizedGroup.description,
  };
}
