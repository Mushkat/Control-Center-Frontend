import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { groupsApi } from '@/api/groupsApi';
import { queryKeys } from '@/api/queryKeys';
import { usersApi } from '@/api/usersApi';
import { ru } from '@/shared/localization/ru';
import { Card } from '@/components/ui/Card';
import { PageContainer } from '@/components/ui/Page';
import { RollingNumber } from '@/components/ui/RollingNumber';
import styles from './WelcomePage.module.css';

export function WelcomePage() {
  const [previewMode, setPreviewMode] = useState<'users' | 'groups'>('users');
  const [isStatsRollReady, setIsStatsRollReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsStatsRollReady(true);
    }, 1060);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const usersQuery = useQuery({ queryKey: queryKeys.users, queryFn: usersApi.getUsers });
  const groupsQuery = useQuery({ queryKey: queryKeys.groups, queryFn: groupsApi.getGroups });

  const users = useMemo(() => usersQuery.data ?? [], [usersQuery.data]);
  const groups = useMemo(() => groupsQuery.data ?? [], [groupsQuery.data]);
  const groupsById = useMemo(
    () => new Map(groups.map((group) => [group.id, group.name])),
    [groups],
  );
  const unassignedUsers = useMemo(() => users.filter((user) => !user.groupId).length, [users]);
  const coverage = users.length
    ? Math.round(((users.length - unassignedUsers) / users.length) * 100)
    : 0;

  const previewUsers = users.slice(0, 3);
  const previewGroups = groups.slice(0, 3).map((group) => ({
    ...group,
    usersCount: users.filter((user) => user.groupId === group.id).length,
  }));

  return (
    <PageContainer className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.kicker}>{ru.welcome.kicker}</p>
          <h1 className={styles.title}>{ru.welcome.title}</h1>
          <p className={styles.description}>{ru.welcome.description}</p>
          <div className={styles.actions}>
            <Link to="/users" className={styles.ctaPrimary}>
              {ru.actions.openUsersTable}
            </Link>
            <Link to="/groups" className={styles.ctaSecondary}>
              {ru.actions.openGroups}
            </Link>
          </div>
        </div>

        <Card className={styles.previewCard}>
          <div className={styles.previewTabs} role="tablist" aria-label={ru.welcome.tabsAriaLabel}>
            <button
              type="button"
              role="tab"
              aria-selected={previewMode === 'users'}
              className={previewMode === 'users' ? styles.previewTabActive : styles.previewTab}
              onClick={() => setPreviewMode('users')}
            >
              {ru.welcome.tabs.users}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={previewMode === 'groups'}
              className={previewMode === 'groups' ? styles.previewTabActive : styles.previewTab}
              onClick={() => setPreviewMode('groups')}
            >
              {ru.welcome.tabs.groups}
            </button>
          </div>

          <div className={styles.previewViewport}>
            {previewMode === 'users' ? (
              <div className={styles.miniTableWrap}>
                <p className={styles.previewTitle}>{ru.welcome.preview.usersTitle}</p>
                <table className={styles.miniTable}>
                  <thead>
                    <tr>
                      <th>{ru.welcome.preview.columns.name}</th>
                      <th>{ru.welcome.preview.columns.account}</th>
                      <th>{ru.welcome.preview.columns.group}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewUsers.length ? (
                      previewUsers.map((user) => (
                        <tr key={user.id}>
                          <td>{user.fullName}</td>
                          <td>{user.account}</td>
                          <td>
                            {user.groupId
                              ? (groupsById.get(user.groupId) ?? ru.common.unknownGroup)
                              : ru.common.noGroup}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3}>{ru.welcome.preview.noUsers}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className={styles.previewGroups}>
                <p className={styles.previewTitle}>{ru.welcome.preview.groupsTitle}</p>
                {previewGroups.length ? (
                  previewGroups.map((group) => (
                    <div key={group.id} className={styles.previewGroupCard}>
                      <p className={styles.previewGroupName}>{group.name}</p>
                      <p className={styles.previewGroupMeta}>
                        {ru.welcome.preview.membersCount(group.usersCount)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className={styles.previewEmpty}>{ru.welcome.preview.noGroups}</p>
                )}
              </div>
            )}
          </div>
        </Card>
      </section>

      <div
        className={`${styles.secondaryContent} motion-enter`}
        style={
          {
            '--motion-enter-delay': '660ms',
            '--motion-enter-duration': '340ms',
            '--motion-enter-distance': '10px',
          } as CSSProperties
        }
      >
        <section className={styles.statsRow}>
          {[
            { label: ru.welcome.stats.totalUsers, value: users.length },
            { label: ru.welcome.stats.totalGroups, value: groups.length },
            { label: ru.welcome.stats.unassignedUsers, value: unassignedUsers },
            { label: ru.welcome.stats.assignmentCoverage, value: coverage, suffix: '%' },
          ].map((stat, index) => (
            <Card key={stat.label} className={styles.statCard}>
              <p className={styles.statLabel}>{stat.label}</p>
              <p className={styles.statValue}>
                <RollingNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  trigger={isStatsRollReady}
                  delayMs={index * 35}
                />
              </p>
            </Card>
          ))}
        </section>

        <section className={styles.features}>
          {[
            ru.welcome.features.search,
            ru.welcome.features.lifecycle,
            ru.welcome.features.groups,
            ru.welcome.features.architecture,
          ].map((feature) => (
            <Card key={feature.title} className={styles.featureCard}>
              <h2 className={styles.featureTitle}>{feature.title}</h2>
              <p className={styles.featureText}>{feature.text}</p>
            </Card>
          ))}
        </section>
      </div>
    </PageContainer>
  );
}
