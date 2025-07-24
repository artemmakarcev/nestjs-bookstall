import { UsersModule } from './../users/users.module';
import { BooksRepository } from './books.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './books.entity';
import { JwtStrategy } from 'src/core/guards/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), UsersModule],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, JwtStrategy],
})
export class BooksModule {}
