import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserAccessService } from '../services/useraccess.service';
import { UserAuthService } from '../services/userAuth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../strategy/jwt.strategy';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '24h',
      },
    }),

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserAccessService,
    UserAuthService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class UserModule {}
