import { Injectable } from '@nestjs/common';
import { UserData, UserDto } from './users.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUsers(): Promise<UserData[]> {
    return this.usersRepository.getAllUsers();
  }

  async getById(id: string): Promise<UserData> {
    return this.usersRepository.getById(id);
  }

  async createUser(user: UserDto): Promise<UserData> {
    return this.usersRepository.createUser(user);
  }

  async deleteUser(id: string): Promise<UserData> {
    return this.usersRepository.deleteUser(id);
  }
}
