import { request } from '@/api/http';
import { normalizeNewUser, normalizeUser } from '@/lib/entitiesAdapters';
import type { NewUser, User } from '@/types/entities';

function createPayload(payload: NewUser): User {
  return {
    id: crypto.randomUUID(),
    ...normalizeNewUser(payload),
  };
}

export const usersApi = {
  getUsers: async () => {
    const users = await request<User[]>('/users');
    return users.map(normalizeUser);
  },
  createUser: async (payload: NewUser) => {
    const createdUser = await request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(createPayload(payload)),
    });

    return normalizeUser(createdUser);
  },
  updateUser: async (id: string, payload: NewUser) => {
    const updatedUser = await request<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(normalizeNewUser(payload)),
    });

    return normalizeUser(updatedUser);
  },
  deleteUser: (id: string) => request<void>(`/users/${id}`, { method: 'DELETE' }),
};
