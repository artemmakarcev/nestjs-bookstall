import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from './core/config/configurationType';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  //CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const configService = app.get(ConfigService<ConfigurationType>);
  const port = configService.get('apiSettings.PORT', { infer: true })!;

  await app.listen(port);
  console.log(`Server has been started on: http://localhost:${port}`);
}
bootstrap();
