import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserModel } from '../model/createUser.model';
import { User } from '../schemas/user.schema';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserModel: CreateUserModel): Promise<User> {
    const createdUser = await this.userService.create(createUserModel);
    return createdUser;
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
