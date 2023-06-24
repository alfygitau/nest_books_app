import { Module } from '@nestjs/common';
import { ReviewsController } from './controllers/reviews/reviews.controller';
import { ReviewsService } from './services/reviews/reviews.service';
import { Review } from 'src/typeorm/entities/Review';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Book } from 'src/typeorm/entities/Book';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Book])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
