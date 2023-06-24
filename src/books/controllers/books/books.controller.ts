import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateBookParams } from 'src/books/dtos/CreateBook.dto';
import { BooksService } from 'src/books/services/books/books.service';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  getAllBooks() {
    return this.bookService.fetchBooks();
  }

  @Post(':id/create')
  createBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() bookPayload: CreateBookParams,
  ) {
    return this.bookService.createBook(id, bookPayload);
  }

  @Get(':id')
  getBookById(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.getBookById(id);
  }
}
