import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { BanUserModel } from '../models/banUser.model';
@Injectable()
export class UserAccessService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async banUser(banUserModel: BanUserModel): Promise<any> {
    const bannedUser = await this.userModel.updateOne(
      { _id: banUserModel.id },
      { $set: { isBanned: true } },
    );
    return bannedUser;
  }
  async unbanUser(banUserModel: BanUserModel): Promise<any> {
    const unbannedUser = await this.userModel.updateOne(
      { _id: banUserModel.id },
      { $set: { isBanned: false } },
    );
    return unbannedUser;
  }
}
