import {
  IsOptional,
  MinLength,
  IsString,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @IsString()
  @MinLength(2)
  @ApiProperty({
    description: 'The name book',
    example: 'Alphabet',
    type: String,
  })
  title: string;

  @IsInt()
  @Min(5)
  @Max(120)
  @Type(() => Number)
  @ApiProperty({
    description: 'The age restriction',
    example: '5',
    type: Number,
  })
  ageRestriction: number;

  @IsString()
  @ApiProperty({
    description: 'The author of the book',
    example: 'writer',
    type: String,
  })
  author: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Book image', required: false, type: String })
  image?: string;
}

export class CreateBookResponseDto {
  @ApiProperty()
  id: string;
}
