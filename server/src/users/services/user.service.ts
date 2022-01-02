import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActiveStateUser } from '../models/activeStateUser.model';
import { UserModel } from '../models/createUser.model';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserModel: UserModel): Promise<User> {
    const createdUser = await this.userModel.create(createUserModel);
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec() || [];
  }

  async changeActive(activeStateUser: ActiveStateUser): Promise<unknown> {
    const activeUser = await this.userModel.updateOne(
      { _id: activeStateUser.id },
      { $set: { isOnline: activeStateUser.isOnline } },
    );
    if (!activeUser.acknowledged) {
      throw new Error("Cant change user's activity state");
    }
    return await this.userModel.find({ _id: activeStateUser.id });
  }
}
