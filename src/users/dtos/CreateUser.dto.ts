import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/utils/types';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  role: UserRole;

  @IsNotEmpty()
  password: string;
}
