import { JwtAuthGuard } from './../../core/guards/jwt-auth-guard';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtOptionalGuard } from '../../core/guards/jwt-optional-guard';
import { AuthenticatedRequest } from 'src/types/authenticated-request';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @SkipThrottle()
  @HttpCode(HttpStatus.OK)
  async getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtOptionalGuard)
  async getBookById(
    @Param('id') id: number,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = req.user?.userId || null;

    return this.booksService.getBookById(id, userId);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async createBook(
    @Body() bookDto: CreateBookDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = req.user.userId;

    return this.booksService.createBook(bookDto, userId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateBook(
    @Param('id') id: number,
    @Body() bookDto: UpdateBookDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = req.user.userId;

    return this.booksService.updateBook(id, bookDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async deleteBook(
    @Param('id') id: number,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = req.user.userId;

    await this.booksService.deleteBook(id, userId);
  }
}
