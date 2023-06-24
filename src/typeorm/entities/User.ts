import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './Profile';
import { Review } from './Review';
import { Exclude } from 'class-transformer';
import { UserRole } from 'src/utils/types';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  role: UserRole;

  @CreateDateColumn()
  createAt: Date;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
