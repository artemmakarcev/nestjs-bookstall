import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  RegisterUserDto,
  RegisterUserResponseDto,
} from './dto/register-user.dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Used to register a new user' })
  @ApiOkResponse({
    description: 'User registered',
    type: RegisterUserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request user',
  })
  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  registerUser(@Body() dto: RegisterUserDto) {
    return this.userService.registerUser(dto);
  }

  @ApiOperation({ summary: 'Used to get all users' })
  @ApiOkResponse({
    description: 'All users',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAlUsers() {
    return this.userService.getAllUsers();
  }
}
