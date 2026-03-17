import { ru } from '@/shared/localization/ru';
import { Card } from '@/components/ui/Card';
import { PageSection } from '@/components/ui/Page';
import styles from './GroupsSummary.module.css';

interface GroupsSummaryProps {
  totalGroups: number;
  totalUsers: number;
  usersWithoutGroup: number;
}

export function GroupsSummary({ totalGroups, totalUsers, usersWithoutGroup }: GroupsSummaryProps) {
  const groupedUsers = totalUsers - usersWithoutGroup;
  const coverage = totalUsers > 0 ? Math.round((groupedUsers / totalUsers) * 100) : 0;

  const stats = [
    {
      label: ru.groups.overview.totalGroups,
      value: totalGroups,
    },
    {
      label: ru.groups.overview.totalUsers,
      value: totalUsers,
    },
    {
      label: ru.groups.overview.coverage,
      value: `${coverage}%`,
      note: ru.groups.overview.coverageNote(groupedUsers, totalUsers),
    },
    {
      label: ru.groups.overview.unassigned,
      value: usersWithoutGroup,
      tone: usersWithoutGroup ? 'warning' : 'success',
    },
  ];

  return (
    <PageSection title={ru.groups.overview.title}>
      <div className={styles.grid}>
        {stats.map((stat) => (
          <Card key={stat.label} className={styles.card}>
            <p className={styles.label}>{stat.label}</p>
            <p className={styles.value}>{stat.value}</p>
            <p className={styles.note}>{stat.note}</p>
            {stat.label === ru.groups.overview.coverage ? (
              <div className={styles.progressTrack} aria-hidden="true">
                <div className={styles.progressBar} style={{ width: `${coverage}%` }} />
              </div>
            ) : null}
            {stat.tone ? <span className={stat.tone === 'warning' ? styles.warningDot : styles.successDot} aria-hidden="true" /> : null}
          </Card>
        ))}
      </div>
    </PageSection>
  );
}
