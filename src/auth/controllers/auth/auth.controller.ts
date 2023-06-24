import { Body, Controller, Post } from '@nestjs/common';
import { LoginCredentialsDto } from 'src/auth/dtos/loginCredentials.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() credentials: LoginCredentialsDto) {
    return this.authService.login(credentials.username, credentials.password);
  }
}
