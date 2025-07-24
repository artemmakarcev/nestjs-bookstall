import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './books.entity';
import { BooksRepository } from './books.repository';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { UpdateBookDto } from './dto/update-book.dto';
import { User } from '../users/user.entity';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    return this.booksRepository.findAll();
  }

  async getBookById(id: number, userId: number | null): Promise<Book> {
    let userPromise: Promise<User> | null = null;

    if (userId !== null) {
      userPromise = this.usersRepository.findByIdOrNotFoundFail(userId);
    }

    const bookPromise = this.booksRepository.findOneOrNotFoundFail(id);

    const [user, book] = await Promise.all([userPromise, bookPromise]);

    book.checkRestriction(user);
    return book;
  }

  async createBook(
    createBookDto: CreateBookDto,
    userId: number,
  ): Promise<Book> {
    const user = await this.usersRepository.findByIdOrNotFoundFail(userId);

    const newBook = Book.createBook(createBookDto, userId, user.age);

    return this.booksRepository.save(newBook);
  }

  async updateBook(
    id: number,
    updateBookDto: UpdateBookDto,
    userId: number,
  ): Promise<Book> {
    const book = await this.booksRepository.findOneOrNotFoundFail(id);

    book.updateBook(updateBookDto, userId);

    return this.booksRepository.save(book);
  }

  async deleteBook(id: number, userId: number): Promise<void> {
    const book = await this.booksRepository.findOneOrNotFoundFail(id);

    book.deleteBook(userId);

    await this.booksRepository.remove(book.id);
  }
}
