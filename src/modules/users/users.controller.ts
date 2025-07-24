import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  registerUser(@Body() dto: RegisterUserDto) {
    return this.userService.registerUser(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAlUsers() {
    return this.userService.getAllUsers();
  }
}
