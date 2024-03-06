import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  artistId: string | null; // refers to Artist

  @ApiProperty({ required: false })
  albumId: string | null; // refers to Album

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}
