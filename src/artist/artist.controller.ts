import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Param,
  ParseUUIDPipe,
  Put,
  // Delete,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateArtistDto } from './dto/update-artist.dto';

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

  @Get()
  @ApiOperation({ summary: 'get all artists' })
  @ApiResponse({
    status: 200,
    description: 'all artists records',
  })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get all artists' })
  @ApiResponse({
    status: 200,
    description: 'record with id === artistId if it exists',
  })
  @ApiResponse({
    status: 400,
    description: 'corresponding message if artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description:
      'corresponding message if record with id === artistId doesn`t exist',
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update artist info' })
  @ApiResponse({
    status: 200,
    description: 'updated record if request is valid',
  })
  @ApiResponse({
    status: 400,
    description: 'corresponding message if artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description:
      'corresponding message if record with id === artistId doesn`t exist',
  })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.artistService.remove(+id);
  // }
}
