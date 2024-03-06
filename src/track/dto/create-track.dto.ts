import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
  duration: number; // integer number
}
