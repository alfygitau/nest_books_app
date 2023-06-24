import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/typeorm/entities/Book';
import { Review } from 'src/typeorm/entities/Review';
import { User } from 'src/typeorm/entities/User';
import { CreateUserReviewParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  getReviews() {
    return this.reviewRepository.find();
  }

  async createUserReview(
    userId: number,
    bookId: number,
    reviewPayload: CreateUserReviewParams,
  ) {
    const user = await this.userRepository.findOneById(userId);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const book = await this.bookRepository.findOneById(bookId);
    if (!book) throw new HttpException('Book not found', HttpStatus.NOT_FOUND);

    const newReview = this.reviewRepository.create({
      ...reviewPayload,
      user,
      book,
    });

    const savedReview = this.reviewRepository.save(newReview);
    return savedReview;
  }
}
