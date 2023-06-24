import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/typeorm/entities/Book';
import { User } from 'src/typeorm/entities/User';
import { CreateBookParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  fetchBooks() {
    return this.bookRepository.find({ relations: ['author', 'reviews'] });
  }
  async createBook(id: number, bookPayload: CreateBookParams) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    let newBook = await this.bookRepository.create(bookPayload);
    newBook.author = user;
    let savedBook = await this.bookRepository.save(newBook);

    return savedBook;
  }
  async getBookById(id: number) {
    const book = await this.bookRepository.findOneBy({ id: String(id) });

    if (!book) throw new HttpException('Book not found', HttpStatus.NOT_FOUND);

    return book;
  }
}
