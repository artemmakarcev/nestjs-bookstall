import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './books.entity';
import { BooksRepository } from './books.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  async getAllBooks(): Promise<Book[]> {
    return this.booksRepository.findAll();
  }

  async getBookById(id: number): Promise<Book> {
    return this.booksRepository.findOneOrNotFoundFail(id);
  }

  async createBook(dto: CreateBookDto): Promise<void> {
    console.log(dto);
    const book = new Book();
    book.title = dto.title;
    book.ageRestriction = Number(dto.ageRestriction);
    // book.ageRestriction = 10;
    book.author = dto.author;

    await this.booksRepository.save(book);
  }
}
