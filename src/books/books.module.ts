import { Module } from '@nestjs/common';
import { BooksController } from './controllers/books/books.controller';
import { BooksService } from './services/books/books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/typeorm/entities/Book';
import { User } from 'src/typeorm/entities/User';
import { Review } from 'src/typeorm/entities/Review';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User, Review])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
