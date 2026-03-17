export function pluralizeRu(count: number, one: string, few: string, many: string): string {
  const absoluteCount = Math.abs(count);
  const lastTwo = absoluteCount % 100;

  if (lastTwo >= 11 && lastTwo <= 14) {
    return many;
  }

  const last = absoluteCount % 10;
  if (last === 1) return one;
  if (last >= 2 && last <= 4) return few;

  return many;
}

export function usersCountLabel(count: number): string {
  return `${count} ${pluralizeRu(count, 'пользователь', 'пользователя', 'пользователей')}`;
}

export function membersCountLabel(count: number): string {
  return `${count} ${pluralizeRu(count, 'участник', 'участника', 'участников')}`;
}
