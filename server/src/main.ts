import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//TODO: Database -> user document, chathistory document, tbc
//TODO: Database related: user search, account abandon functionality
//TODO: Controllers: Chat gateway socket(reinforcements), login/logout, registration.

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();
