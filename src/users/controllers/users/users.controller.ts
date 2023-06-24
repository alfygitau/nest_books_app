import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/utils/types';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async getUsers() {
    let users = await this.userService.fetchUsers();
    return plainToClass(SerializedUser, users);
  }

  @Post(':id/profile')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() userPrfile: CreateUserProfileDto,
  ) {
    const profile = this.userService.createUserProfile(id, userPrfile);
    return plainToClass(SerializedUser, profile);
  }

  @Post()
  createUser(@Body() userPayload: CreateUserDto) {
    const newUser = this.userService.createUser(userPayload);
    return plainToClass(SerializedUser, newUser);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToClass(SerializedUser, user);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userPayload: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(id, userPayload);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return plainToClass(SerializedUser, updatedUser);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }
}
