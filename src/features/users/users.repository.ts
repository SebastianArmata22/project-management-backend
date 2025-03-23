import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mongodbErrorHandler } from '../../core/errors/mongodb-error-handler';
import { UserData, UserDto } from './users.model';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUsers(): Promise<UserData[]> {
    return this.userModel.find().lean();
  }

  async getById(id: string): Promise<UserData> {
    const user = await this.userModel.findById(id).lean();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async createUser(user: UserDto): Promise<UserData> {
    try {
      return await this.userModel.create(user);
    } catch (error) {
      mongodbErrorHandler(error);
    }
  }

  async deleteUser(id: string): Promise<UserData> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).lean();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return deletedUser;
  }
}
