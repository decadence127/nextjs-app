import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ActiveStateUser } from '../models/activeStateUser.model';
import { BanUserModel } from '../models/banUser.model';
import { UserModel } from '../models/createUser.model';
import { UserLoginResponseModel } from '../models/userLogin.res.model';
import { UserRegistrationRequestModel } from '../models/userRegistration.req.model';
import { ValidUser } from '../models/validUserModel';
import { User } from '../schemas/user.schema';
import { UserService } from '../services/user.service';
import { UserAccessService } from '../services/useraccess.service';
import { UserAuthService } from '../services/userAuth.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userAccessService: UserAccessService,
    private readonly userAuthService: UserAuthService,
  ) {}

  @Post()
  async create(@Body() createUserModel: UserModel): Promise<User> {
    console.log(createUserModel);

    const createdUser = await this.userService.create(createUserModel);
    return createdUser;
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Put('/ban')
  async banUser(@Body() banUserModel: BanUserModel): Promise<unknown> {
    try {
      const bannedUser = await this.userAccessService.banUser(banUserModel);
      return bannedUser;
    } catch (e) {
      return e;
    }
  }

  @Put('/unban')
  async unbanUser(@Body() banUserModel: BanUserModel): Promise<unknown> {
    try {
      const unbannedUser = await this.userAccessService.unbanUser(banUserModel);
      return unbannedUser;
    } catch (e) {
      return e;
    }
  }
  @Put('/online')
  async changeActivity(
    @Body() activeStateUser: ActiveStateUser,
  ): Promise<unknown> {
    try {
      const activeUser = await this.userService.changeActive(activeStateUser);
      return activeUser;
    } catch (e) {
      return e;
    }
  }

  @Post('auth/registration')
  async userRegistration(@Body() reg: UserRegistrationRequestModel) {
    return await this.userAuthService.userRegistration(reg);
  }
  @Post('auth/login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req, @Res({ passthrough: true }) res) {
    console.log(req.body);
    const token = await this.userAuthService.getJWTToken(req.body as ValidUser);
    const refreshToken = await this.userAuthService.getRefreshToken(
      req.body.login,
    );
    const secretData = {
      token,
      refreshToken,
    };
    res.cookie('auth-cookie', secretData, { httpOnly: true });
    const userLogin = new UserLoginResponseModel();
    userLogin.message = 'You have been authenticated successfully';
    userLogin.successStatus = true;
    return userLogin;
  }
  @Get('friends')
  @UseGuards(AuthGuard('jwt'))
  async friends(@Req() req) {
    return ['jack', 'saimon'];
  }
}
