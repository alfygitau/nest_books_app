import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateReviewDto } from 'src/reviews/dtos/CreateReviews.dto';
import { ReviewsService } from 'src/reviews/services/reviews/reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Get()
  getReviews() {
    return this.reviewService.getReviews();
  }

  @Post(':userId/:bookId/create')
  createBookReview(
    @Param('userId') userId: number,
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() reviewPayload: CreateReviewDto,
  ) {
    return this.reviewService.createUserReview(userId, bookId, reviewPayload);
  }
}
