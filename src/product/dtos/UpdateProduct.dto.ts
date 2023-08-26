import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description?: string | null;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
