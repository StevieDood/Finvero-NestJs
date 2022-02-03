import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/users.interfaces';
import { CreateUserDTO } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    return user;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const user = await new this.userModel(createUserDTO);
    return await user.save();
  }

  async deleteUser(userId: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    return await deletedUser;
  }

  async updateUser(
    userId: string,
    createUserDTO: CreateUserDTO,
  ): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      createUserDTO,
      { new: true },
    );
    return updatedUser;
  }
}
