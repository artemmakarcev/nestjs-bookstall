import { LocalAuthGuard } from './auth.guard';
import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticatedRequest } from 'src/types/authenticated-request';
import { Throttle } from '@nestjs/throttler';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Authentication login password',
    description: 'User authentication',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  login(@Request() req: AuthenticatedRequest) {
    const userId = req.user.userId;

    return this.authService.login(userId);
  }
}
