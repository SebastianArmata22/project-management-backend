import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserData, UserDto } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<UserData[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserData> {
    return this.usersService.getById(id);
  }

  @Post()
  async createUser(@Body() user: UserDto): Promise<UserData> {
    return this.usersService.createUser(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserData> {
    return this.usersService.deleteUser(id);
  }
}
