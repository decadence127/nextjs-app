import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
//TODO: Database -> user document -- DONE, chathistory document -- DONE
//TODO: Database related: user search, account restriction functionality  -- DONE
//TODO: Controllers: Chat gateway socket(reinforcements) -- ABANDONED IN FAVOR OF HTTP, login/logout -- IN PROGRESS, registration -- IN PROGRESS.

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
