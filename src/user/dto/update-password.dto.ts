import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string; // new password
}
