import {
  Controller,
  // Get,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { UpdateArtistDto } from './dto/update-artist.dto';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiOperation({ summary: 'create new artist' })
  @ApiResponse({
    status: 201,
    description: 'newly created record if request is valid',
  })
  @ApiResponse({
    status: 400,
    description:
      'corresponding message if request body does not contain required fields',
  })
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  // @Get()
  // findAll() {
  //   return this.artistService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.artistService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
  //   return this.artistService.update(+id, updateArtistDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.artistService.remove(+id);
  // }
}
