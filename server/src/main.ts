import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//TODO: Database -> user document -- DONE, chathistory document -- DONE
//TODO: Database related: user search, account restriction functionality  -- DONE
//TODO: Controllers: Chat gateway socket(reinforcements) -- ABANDONED IN FAVOR OF HTTP, login/logout -- IN PROGRESS, registration -- IN PROGRESS.

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();
