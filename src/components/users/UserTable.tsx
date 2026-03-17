import { ru } from '@/shared/localization/ru';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Table, TableContainer, TableScroll } from '@/components/ui/Table';
import { cn } from '@/lib/cn';
import { getGroupName, type SortState } from '@/lib/userTable';
import type { Group, User } from '@/types/entities';
import styles from './UserTable.module.css';

interface UserTableProps {
  users: User[];
  groupsById: Map<string, Group>;
  sort: SortState;
  onSortChange: (key: SortState['key']) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const columns: Array<{ key: SortState['key']; label: string }> = [
  { key: 'fullName', label: ru.users.table.columns.fullName },
  { key: 'account', label: ru.users.table.columns.account },
  { key: 'email', label: ru.users.table.columns.email },
  { key: 'phone', label: ru.users.table.columns.phone },
  { key: 'groupName', label: ru.users.table.columns.group },
];

export function UserTable({ users, groupsById, sort, onSortChange, onEdit, onDelete }: UserTableProps) {
  return (
    <TableContainer>
      <TableScroll>
        <Table>
          <thead className={styles.head}>
            <tr>
              {columns.map((column) => {
                const isActive = sort.key === column.key;
                const directionLabel = isActive
                  ? (sort.direction === 'asc' ? ru.common.sortAscending : ru.common.sortDescending)
                  : ru.common.sortNone;

                return (
                  <th
                    key={column.key}
                    scope="col"
                    className={cn(styles.headCell, isActive && styles.headActive)}
                    aria-sort={isActive ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                  >
                    <button
                      type="button"
                      className={styles.sortButton}
                      onClick={() => onSortChange(column.key)}
                      aria-label={ru.users.table.sortToggleAria(directionLabel)}
                    >
                      <span>{column.label}</span>
                      <span className={styles.sortIcon} aria-hidden="true">
                        {isActive ? (sort.direction === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    </button>
                  </th>
                );
              })}
              <th scope="col" className={styles.actionsHead}>
                {ru.users.table.columns.actions}
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={styles.row}>
                <th scope="row" className={styles.primaryCell}>
                  {user.fullName}
                </th>
                <td className={cn(styles.cell, styles.accountCell)}>{user.account}</td>
                <td className={cn(styles.cell, styles.emailCell)}>{user.email}</td>
                <td className={cn(styles.cell, styles.phoneCell)}>{user.phone}</td>
                <td className={cn(styles.cell, styles.groupCell)}>
                  <Badge tone={user.groupId ? 'brand' : 'danger'}>{getGroupName(user.groupId, groupsById)}</Badge>
                </td>
                <td className={styles.actionsCell}>
                  <div className={styles.actionsRow}>
                    <Button variant="secondary" className={styles.editButton} onClick={() => onEdit(user)}>
                      {ru.actions.edit}
                    </Button>
                    <Button variant="dangerSoft" className={styles.deleteButton} onClick={() => onDelete(user)}>
                      {ru.actions.delete}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableScroll>
    </TableContainer>
  );
}
