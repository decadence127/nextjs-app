import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
import { MessageModule } from './messages/modules/message.module';
import { UserModule } from './users/modules/user.module';
import { JwtStrategy } from './users/strategy/jwt.strategy';
@Module({
  imports: [
    UserModule,
    MessageModule,
    ConfigModule.forRoot({ envFilePath: `.env` }),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, JwtStrategy],
})
export class AppModule {}
