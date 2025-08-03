import { JwtAuthGuard } from './../../core/guards/jwt-auth-guard';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto, CreateBookResponseDto } from './dto/create-book.dto';
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
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Used to get all books' })
  @ApiOkResponse({
    description: 'The list of books has been received',
  })
  @Get()
  @SkipThrottle()
  @HttpCode(HttpStatus.OK)
  async getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @ApiOperation({ summary: 'Used to get book by id' })
  @ApiOkResponse({ description: 'The book by id has been received' })
  @ApiForbiddenResponse({ description: 'Are you under 18 or not logged in' })
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

  @ApiOperation({ summary: 'Used to create a new book' })
  @ApiOkResponse({
    description: 'Book created',
    type: CreateBookResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad payload sent' })
  @ApiUnauthorizedResponse({ description: 'You need login' })
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

  @ApiOperation({ summary: 'Used to update a new book' })
  @ApiResponse({ status: 200, description: 'Book updated' })
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

  @ApiOperation({ summary: 'Used to delete a new book' })
  @ApiResponse({ status: 200, description: 'Book deleted' })
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
