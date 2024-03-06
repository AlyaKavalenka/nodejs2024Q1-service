import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  // Patch,
  Param,
  ParseUUIDPipe,
  // Delete,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAlbumDto } from './dto/create-album.dto';
// import { UpdateAlbumDto } from './dto/update-album.dto';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperation({ summary: 'Create new album' })
  @ApiResponse({
    status: 201,
    description: 'newly created record if request is valid',
  })
  @ApiResponse({
    status: 400,
    description: 'if request body does not contain required fields',
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: 200, description: 'All albums records.' })
  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single album by id' })
  @ApiResponse({
    status: 200,
    description: 'if record with id === albumId if it exists',
  })
  @ApiResponse({
    status: 400,
    description: 'if albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'if record with id === albumId doesn`t exist',
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
  //   return this.albumService.update(+id, updateAlbumDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.albumService.remove(+id);
  // }
}
