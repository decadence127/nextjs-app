import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UserRegistrationRequestModel } from '../models/userRegistration.req.model';
import * as bcrypt from 'bcrypt';
import { UserRegistrationResponseModel } from '../models/userRegistration.res.model';
import { UserModel } from '../models/createUser.model';
import { ValidUser } from '../models/validUserModel';
import { JwtService } from '@nestjs/jwt';
import * as randomToken from 'rand-token';
import * as moment from 'moment';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  public async getJWTToken(user: ValidUser): Promise<string> {
    const payload = { ...user };

    return this.jwtService.signAsync(payload);
  }
  public async getRefreshToken(login: string): Promise<string> {
    const userDataToUpdate = {
      refreshToken: randomToken.generate(16),
      refreshTokenExp: moment().day(1).format('YYYY/MM/DD'),
    };
    console.log(userDataToUpdate);

    const response = await this.userModel.updateOne(
      { login: login },
      {
        $set: {
          RefreshToken: userDataToUpdate.refreshToken,
          RefreshTokenExp: userDataToUpdate.refreshTokenExp,
        },
      },
    );
    console.log(response);

    return userDataToUpdate.refreshToken;
  }

  public async validateUserCredentials(
    login: string,
    password: string,
  ): Promise<ValidUser> {
    const user = await this.userModel.findOne({ login: login });

    if (user == null) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    const validUser = new ValidUser();
    validUser.name = user.name;
    validUser.login = user.login;
    validUser.id = user._id;

    return validUser;
  }
  private async registrationValidation(
    regUserModel: UserRegistrationRequestModel,
  ): Promise<string> {
    if (!regUserModel.login) {
      return 'login cant be empty';
    }
    // const emailRule =
    //   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //   if(!emailRule.test(regUserModel.email.toLowerCase()))
    const candidate = await this.userModel.findOne({
      login: regUserModel.login,
    });
    if (candidate && candidate.login) {
      return 'User with such login already exists.';
    }
    return '';
  }
  private async getPasswordHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
  public async userRegistration(
    regUserModel: UserRegistrationRequestModel,
  ): Promise<UserRegistrationResponseModel> {
    const result = new UserRegistrationResponseModel();
    const errorMessage = await this.registrationValidation(regUserModel);

    if (errorMessage) {
      result.message = errorMessage;
      result.successStatus = false;
      return result;
    }
    const newUser = new UserModel();
    newUser.login = regUserModel.login;
    newUser.password = await this.getPasswordHash(regUserModel.password);
    newUser.name = regUserModel.name;

    await this.userModel.create(newUser);

    result.successStatus = true;
    result.message = 'Registered sucessfully';
    return result;
  }
}
