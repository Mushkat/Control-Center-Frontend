import { useMemo, type CSSProperties } from 'react';
import { useQuery } from '@tanstack/react-query';
import { groupsApi } from '@/api/groupsApi';
import { queryKeys } from '@/api/queryKeys';
import { usersApi } from '@/api/usersApi';
import { ru } from '@/shared/localization/ru';
import { EmptyState, ErrorState, LoadingState } from '@/components/common/States';
import { GroupCard } from '@/components/groups/GroupCard';
import { GroupsSummary } from '@/components/groups/GroupsSummary';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { PageContainer, PageHeader, PageSection } from '@/components/ui/Page';
import { groupUsers } from '@/lib/userTable';
import styles from './GroupsPage.module.css';

export function GroupsPage() {
  const groupsQuery = useQuery({ queryKey: queryKeys.groups, queryFn: groupsApi.getGroups });
  const usersQuery = useQuery({ queryKey: queryKeys.users, queryFn: usersApi.getUsers });

  const groups = useMemo(() => groupsQuery.data ?? [], [groupsQuery.data]);
  const users = useMemo(() => usersQuery.data ?? [], [usersQuery.data]);

  const validGroupIds = useMemo(() => new Set(groups.map((group) => group.id)), [groups]);
  const groupedUsers = useMemo(
    () => groupUsers(users, validGroupIds),
    [users, validGroupIds],
  );

  if (groupsQuery.isLoading || usersQuery.isLoading) {
    return <LoadingState />;
  }

  if (groupsQuery.isError || usersQuery.isError) {
    return (
      <ErrorState
        title={ru.groups.states.loadErrorTitle}
        description={ru.groups.states.loadErrorDescription}
      />
    );
  }

  if (!groups.length && !users.length) {
    return (
      <EmptyState
        title={ru.groups.states.emptyTitle}
        description={ru.groups.states.emptyDescription}
      />
    );
  }

  return (
    <PageContainer>
      <div
        className={`${styles.topReveal} motion-enter motion-enter-subtle`}
        style={
          {
            '--motion-enter-delay': '50ms',
            '--motion-enter-duration': '370ms',
            '--motion-enter-distance': '7px',
          } as CSSProperties
        }
      >
        <PageHeader title={ru.groups.pageTitle} description={ru.groups.pageDescription} />

        <GroupsSummary
          totalGroups={groups.length}
          totalUsers={users.length}
          usersWithoutGroup={groupedUsers.withoutGroup.length}
        />

        <PageSection
          title={ru.groups.list.title}
          description={ru.groups.list.description}
          actions={<Badge tone="neutral">{ru.groups.list.totalGroups(groups.length)}</Badge>}
        >
          <div className={styles.grid}>
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                users={groupedUsers.byGroupId.get(group.id) ?? []}
              />
            ))}
          </div>
        </PageSection>
      </div>

      <div
        className={`${styles.contentReveal} motion-enter motion-enter-subtle`}
        style={
          {
            '--motion-enter-delay': '170ms',
            '--motion-enter-duration': '410ms',
            '--motion-enter-distance': '8px',
          } as CSSProperties
        }
      >
        <PageSection
          title={ru.groups.unassigned.title}
        >
          <Card className={styles.unassignedCard}>
            <div className={styles.unassignedHeader}>
              <p className={styles.unassignedDescription}>{ru.groups.unassigned.note}</p>
              <Badge tone={groupedUsers.withoutGroup.length ? 'danger' : 'brand'}>
                {groupedUsers.withoutGroup.length}
              </Badge>
            </div>

            {groupedUsers.withoutGroup.length ? (
              <ul className={styles.unassignedList} aria-label={ru.groups.unassigned.title}>
                {groupedUsers.withoutGroup.map((user) => (
                  <li key={user.id} className={styles.unassignedItem}>
                    <p className={styles.unassignedName}>{user.fullName}</p>
                    <p className={styles.unassignedEmail}>{user.email}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.unassignedEmpty}>{ru.groups.unassigned.empty}</p>
            )}
          </Card>
        </PageSection>
      </div>
    </PageContainer>
  );
}
