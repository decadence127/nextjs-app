import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserModel } from '../model/createUser.model';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(createUserModel: CreateUserModel): Promise<User> {
    const createdUser = await this.userModel.create(createUserModel);
    return createdUser;
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
