import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  async getBookById(@Param('id') id: number) {
    return this.booksService.getBookById(id);
  }

  @Post()
  async createBook(@Body() bookDto: CreateBookDto) {
    return this.booksService.createBook(bookDto);
  }

  @Put(':id')
  async updateBook(@Param('id') id: number, @Body() bookDto: UpdateBookDto) {
    // const book = await getBookById(id);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: number) {}
}
