import { Body, Controller, Get, Post } from '@nestjs/common';
import { BanUserModel } from '../models/banUser.model';
import { CreateUserModel } from '../models/createUser.model';
import { User } from '../schemas/user.schema';
import { UserService } from '../services/user.service';
import { UserAccessService } from '../services/useraccess.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userAccessService: UserAccessService,
  ) {}

  @Post()
  async create(@Body() createUserModel: CreateUserModel): Promise<User> {
    console.log(createUserModel);

    const createdUser = await this.userService.create(createUserModel);
    return createdUser;
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('/ban')
  async banUser(@Body() banUserModel: BanUserModel): Promise<any> {
    const bannedUser = await this.userAccessService.banUser(banUserModel);
    return bannedUser;
  }

  @Post('/unban')
  async unbanUser(@Body() banUserModel: BanUserModel): Promise<any> {
    const unbannedUser = await this.userAccessService.unbanUser(banUserModel);
    return unbannedUser;
  }
}
