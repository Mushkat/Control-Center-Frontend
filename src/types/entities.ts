export interface User {
  id: string;
  fullName: string;
  account: string;
  email: string;
  groupId: string | null;
  phone: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
}

export interface NewUser {
  fullName: string;
  account: string;
  email: string;
  phone: string;
  groupId: string | null;
}
