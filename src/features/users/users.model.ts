export interface UserData {
  name: string;
  email: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserDto = Pick<UserData, 'name' | 'email' | 'role'>;
