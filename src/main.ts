import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ConfigServiceSingleton } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sequelize = app.get(Sequelize); // Obtenemos la instancia de Sequelize
  await sequelize.sync({ alter: true });

  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  )

  const configService = app.get(ConfigServiceSingleton);
  const port = configService.getPort() ?? 3000;

  await app.listen(port);
  console.log(`App is running on port ${port}`);
}
bootstrap();
