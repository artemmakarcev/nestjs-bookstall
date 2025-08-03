import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'john.doe@example.com',
    type: String,
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User age',
    example: 18,
    type: Number,
  })
  @IsInt()
  age: number;

  @ApiProperty({
    description: 'User password',
    example: '12345678',
    type: String,
  })
  @IsString()
  password: string;
}

export class RegisterUserResponseDto {
  @ApiProperty({
    description: 'Registered user ID',
    example: 1,
    type: Number,
  })
  id: number;
}
