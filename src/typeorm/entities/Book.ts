import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Review } from './Review';

@Entity({ name: 'book' })
export class Book {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  ISBN_no: string;

  @Column()
  publisher: string;

  @Column()
  number_pages: number;

  @Column()
  publication_date: string;

  @Column()
  synopsis: string;

  @Column()
  genre: string;

  @OneToMany(() => Review, review => review.book)
  reviews: Review[];

  @OneToOne(() => User)
  @JoinColumn()
  author: User;
}
