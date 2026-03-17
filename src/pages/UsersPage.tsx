import { useMemo, useState, type CSSProperties } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { groupsApi } from '@/api/groupsApi';
import { queryKeys } from '@/api/queryKeys';
import { usersApi } from '@/api/usersApi';
import { ru } from '@/shared/localization/ru';
import { EmptyState, ErrorState, LoadingState } from '@/components/common/States';
import { AddUserForm } from '@/components/users/AddUserForm';
import { DeleteConfirm } from '@/components/users/DeleteConfirm';
import { UserTable } from '@/components/users/UserTable';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { PageContainer, PageHeader, PageSection } from '@/components/ui/Page';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import {
  buildGroupName,
  buildUserIndex,
  filterUsers,
  sortUsers,
  type SortState,
} from '@/lib/userTable';
import type { NewUser, User } from '@/types/entities';
import styles from './UsersPage.module.css';

function toFormValues(user: User): NewUser {
  return {
    fullName: user.fullName,
    account: user.account,
    email: user.email,
    phone: user.phone,
    groupId: user.groupId,
  };
}

export function UsersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [isAddOpen, setAddOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [sort, setSort] = useState<SortState>({ key: 'fullName', direction: 'asc' });

  const usersQuery = useQuery({ queryKey: queryKeys.users, queryFn: usersApi.getUsers });
  const groupsQuery = useQuery({ queryKey: queryKeys.groups, queryFn: groupsApi.getGroups });

  const refreshUsersData = async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.users });
  };

  const createUserMutation = useMutation({
    mutationFn: (payload: NewUser) => usersApi.createUser(payload),
    onSuccess: () => {
      void refreshUsersData();
      setAddOpen(false);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: NewUser }) => usersApi.updateUser(id, payload),
    onSuccess: () => {
      void refreshUsersData();
      setUserToEdit(null);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: () => {
      void refreshUsersData();
      setUserToDelete(null);
    },
  });

  const debouncedSearch = useDebouncedValue(search, 300);
  const searchQuery = debouncedSearch || search;
  const groups = useMemo(() => groupsQuery.data ?? [], [groupsQuery.data]);
  const users = useMemo(() => usersQuery.data ?? [], [usersQuery.data]);

  const groupsById = useMemo(() => new Map(groups.map((group) => [group.id, group])), [groups]);

  const groupNameById = useMemo(
    () => buildGroupName(users, groupsById),
    [users, groupsById],
  );

  const userSearchIndex = useMemo(
    () => buildUserIndex(users, groupsById, groupNameById),
    [users, groupsById, groupNameById],
  );

  const filteredUsers = useMemo(
    () => filterUsers(users, searchQuery, groupsById, userSearchIndex),
    [users, searchQuery, groupsById, userSearchIndex],
  );

  const filteredGroup = useMemo(
    () => new Map(filteredUsers.map((user) => [user.id, groupNameById.get(user.id) ?? ''])),
    [filteredUsers, groupNameById],
  );

  const visibleUsers = useMemo(
    () => sortUsers(filteredUsers, groupsById, sort, filteredGroup),
    [filteredUsers, groupsById, sort, filteredGroup],
  );

  const handleSortChange = (key: SortState['key']) => {
    setSort((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  if (usersQuery.isLoading || groupsQuery.isLoading) {
    return <LoadingState />;
  }

  if (usersQuery.isError || groupsQuery.isError) {
    return (
      <ErrorState
        title={ru.users.states.loadErrorTitle}
        description={ru.users.states.loadErrorDescription}
      />
    );
  }

  const isSearching = search !== debouncedSearch;
  const hasUsers = users.length > 0;
  const hasResults = visibleUsers.length > 0;
  const unassignedUsers = users.filter((user) => !user.groupId).length;

  return (
    <PageContainer>
      <div
        className={`${styles.topReveal} motion-enter motion-enter-subtle`}
        style={
          {
            '--motion-enter-delay': '40ms',
            '--motion-enter-duration': '360ms',
            '--motion-enter-distance': '7px',
          } as CSSProperties
        }
      >
        <PageHeader title={ru.users.pageTitle} description={ru.users.pageDescription} />

        <PageSection className={styles.metricsSection}>
          <Card className={styles.metricCard}>
            <p className={styles.metricLabel}>{ru.users.summary.totalUsers}</p>
            <p className={styles.metricValue}>{users.length}</p>
          </Card>
          <Card className={styles.metricCard}>
            <p className={styles.metricLabel}>{ru.users.summary.unassigned}</p>
            <p className={styles.metricValue}>{unassignedUsers}</p>
          </Card>
          <Card className={styles.metricCard}>
            <p className={styles.metricLabel}>{ru.users.summary.visibleResults}</p>
            <p className={styles.metricValue}>{visibleUsers.length}</p>
          </Card>
        </PageSection>

        <PageSection>
          <Card className={styles.toolbarCard}>
            <div className={styles.toolbar}>
              <div className={styles.searchBlock}>
                <label htmlFor="users-search" className={styles.searchLabel}>
                  {ru.users.search.label}
                </label>
                <Input
                  id="users-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={ru.users.search.placeholder}
                />
                <p className={styles.searchHint} aria-live="polite">
                  {isSearching
                    ? ru.users.search.searching
                    : ru.users.search.found(visibleUsers.length)}
                </p>
              </div>
              <div className={styles.toolbarActions}>
                <Button onClick={() => setAddOpen(true)}>{ru.actions.addUser}</Button>
              </div>
            </div>
          </Card>
        </PageSection>
      </div>

      <div
        className={`${styles.tableReveal} motion-enter motion-enter-subtle`}
        style={
          {
            '--motion-enter-delay': '150ms',
            '--motion-enter-duration': '390ms',
            '--motion-enter-distance': '7px',
          } as CSSProperties
        }
      >
        <PageSection
          className={styles.tableSection}
          title={ru.users.table.title}
          description={ru.users.table.description}
        >
          {!hasUsers ? (
            <EmptyState
              title={ru.users.states.noUsersTitle}
              description={ru.users.states.noUsersDescription}
            />
          ) : !hasResults ? (
            <EmptyState
              title={ru.users.states.noMatchesTitle}
              description={ru.users.states.noMatchesDescription}
            />
          ) : (
            <UserTable
              users={visibleUsers}
              groupsById={groupsById}
              sort={sort}
              onSortChange={handleSortChange}
              onEdit={setUserToEdit}
              onDelete={setUserToDelete}
            />
          )}
        </PageSection>
      </div>

      <Modal title={ru.modal.addUserTitle} isOpen={isAddOpen} onClose={() => setAddOpen(false)}>
        <AddUserForm
          mode="create"
          groups={groups}
          isSubmit={createUserMutation.isPending}
          submitError={createUserMutation.error?.message ?? null}
          onClose={() => setAddOpen(false)}
          onSubmit={async (payload) => {
            await createUserMutation.mutateAsync(payload);
          }}
        />
      </Modal>

      <Modal
        title={ru.modal.editUserTitle}
        isOpen={Boolean(userToEdit)}
        onClose={() => setUserToEdit(null)}
      >
        {userToEdit ? (
          <AddUserForm
            mode="edit"
            groups={groups}
            initialValues={toFormValues(userToEdit)}
            isSubmit={updateUserMutation.isPending}
            submitError={updateUserMutation.error?.message ?? null}
            onClose={() => setUserToEdit(null)}
            onSubmit={async (payload) => {
              await updateUserMutation.mutateAsync({ id: userToEdit.id, payload });
            }}
          />
        ) : null}
      </Modal>

      <Modal
        title={ru.modal.deleteTitle}
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
      >
        {userToDelete ? (
          <DeleteConfirm
            user={userToDelete}
            isSubmitting={deleteUserMutation.isPending}
            errorMessage={deleteUserMutation.error?.message ?? null}
            onCancel={() => setUserToDelete(null)}
            onConfirm={async () => {
              await deleteUserMutation.mutateAsync(userToDelete.id);
            }}
          />
        ) : null}
      </Modal>
    </PageContainer>
  );
}
