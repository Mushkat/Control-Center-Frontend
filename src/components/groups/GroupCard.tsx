import type { CSSProperties } from 'react';
import { ru } from '@/shared/localization/ru';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import type { Group, User } from '@/types/entities';
import styles from './GroupCard.module.css';

interface GroupCardProps {
  group: Group;
  users: User[];
}

function getGroupColor(groupId: string) {
  const colors = ['#29ccb1', '#54e2cb', '#63c7ff', '#1eaf97'];
  const sum = groupId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[sum % colors.length];
}

export function GroupCard({ group, users }: GroupCardProps) {
  const visibleUsers = users.slice(0, 4);
  const hiddenUsersCount = users.length - visibleUsers.length;

  return (
    <Card as="article" className={styles.card} style={{ '--group-accent': getGroupColor(group.id) } as CSSProperties}>
      <header className={styles.header}>
        <div className={styles.headingRow}>
          <h3 className={styles.title}>{group.name}</h3>
          <Badge tone="brand">{ru.groups.list.badgeUsers(users.length)}</Badge>
        </div>
        <p className={styles.description}>{group.description}</p>
      </header>

      {users.length > 0 ? (
        <>
          <p className={styles.membersLabel}>{ru.groups.list.members}</p>
          <ul className={styles.membersList}>
            {visibleUsers.map((user) => (
              <li key={user.id} className={styles.memberItem}>
                <p className={styles.memberName}>{user.fullName}</p>
                <p className={styles.memberEmail}>{user.email}</p>
              </li>
            ))}
          </ul>
          {hiddenUsersCount > 0 ? <p className={styles.moreUsers}>{ru.groups.list.moreUsers(hiddenUsersCount)}</p> : null}
        </>
      ) : (
        <p className={styles.empty}>{ru.groups.list.emptyMembers}</p>
      )}
    </Card>
  );
}
