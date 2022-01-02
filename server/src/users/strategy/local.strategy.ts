import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ValidUser } from '../models/validUserModel';
import { UserAuthService } from '../services/userAuth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private userAuthService: UserAuthService) {
    super({ usernameField: 'login' });
  }

  async validate(login: string, password: string): Promise<ValidUser> {
    const user = await this.userAuthService.validateUserCredentials(
      login,
      password,
    );

    if (user == null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
