import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'john.doe@example.com',
    type: String,
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '12345678',
    type: String,
  })
  @IsString()
  password: string;
}
