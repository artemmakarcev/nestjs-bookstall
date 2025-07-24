import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, {
  ConfigurationType,
} from './core/config/configurationType';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { BooksModule } from './modules/books/books.module';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CryptoModule } from './modules/crypto/crypto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigurationType>) => {
        const databaseSettings = configService.get('dbSettings', {
          infer: true,
        })!;

        return {
          type: 'postgres',
          host: databaseSettings.DB_HOST,
          port: databaseSettings.DB_PORT,
          username: databaseSettings.USERNAME,
          password: databaseSettings.PASSWORD,
          database: databaseSettings.DB_NAME,
          autoLoadEntities: true,
          synchronize: true,
          logger: 'debug',
        };
      },
    }),
    UsersModule,
    BooksModule,
    AuthModule,
    ThrottlerModule.forRoot({
      // storage: {} //ситуация когда несколько серверов
      throttlers: [
        {
          name: 'short',
          ttl: 1000,
          limit: 3,
        },
        {
          name: 'medium',
          ttl: 10000,
          limit: 20,
        },
        {
          name: 'long',
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
    CryptoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
