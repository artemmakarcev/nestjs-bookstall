import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../core/entity/base.entity';
import { ForbiddenException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { User } from '../users/user.entity';

@Entity('books')
export class Book extends BaseEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  ageRestriction: number;

  @Column({ nullable: true })
  ownerId: number;

  @Column({ nullable: true })
  image?: string;

  checkRestriction(user: User | null): void {
    if (this.ageRestriction >= 18) {
      if (!user || user.age < 18) {
        throw new ForbiddenException('You are not allowed to view this book');
      }
    }
  }

  static createBook(dto: CreateBookDto, userId: number, userAge: number): Book {
    if (userAge < 18 && dto.ageRestriction >= 18) {
      throw new ForbiddenException('Your age is less than 18');
    }

    const book = new Book();

    book.title = dto.title;
    book.author = dto.author;
    book.ageRestriction = dto.ageRestriction;
    book.ownerId = userId;
    book.image = dto.image;

    return book;
  }

  updateBook(dto: UpdateBookDto, userId: number): void {
    if (this.ownerId !== userId) {
      throw new ForbiddenException('You are not allowed to update this book');
    }

    this.title = dto.title ?? this.title;
    this.author = dto.author ?? this.author;
    this.ageRestriction = dto.ageRestriction ?? this.ageRestriction;
    this.image = dto.image ?? this.image;
  }

  deleteBook(userId: number): void {
    if (this.ownerId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to to delete this book',
      );
    }
  }
}
