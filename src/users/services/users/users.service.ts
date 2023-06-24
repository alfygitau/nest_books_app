import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import {
  CreateUserParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}
  fetchUsers() {
    return this.userRepository.find({ relations: ['profile', 'reviews'] });
  }
  async createUser(user: CreateUserParams) {
    const { password, username, email, role } = user;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepository.create({
      username,
      email,
      role,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }
  getUserById(id: number) {
    return this.userRepository.findOneBy({ id });
  }
  async updateUser(id: number, userPayload: UpdateUserParams) {
    await this.userRepository.update({ id }, { ...userPayload });

    const updatedUser = await this.userRepository.findOneBy({ id });

    if (!updatedUser) {
      throw new NotFoundException(`User with ID '${id}' not found.`);
    }
    return updatedUser;
  }
  async deleteUser(id: number) {
    await this.userRepository.delete({ id });

    return { message: 'User deleted successfully' };
  }
  async createUserProfile(id: number, userProfile: CreateUserProfileParams) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new HttpException(
        'User not found. Cannot create profile',
        HttpStatus.BAD_REQUEST,
      );
    const newProfile = this.profileRepository.create(userProfile);
    const savedProfile = await this.profileRepository.save(newProfile);

    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username });

    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    return user;
  }
}
