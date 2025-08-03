import { ApiProperty } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({
    description: 'Update book id',
  })
  id: number;
}
