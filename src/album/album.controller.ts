import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

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

  @Put(':id')
  @ApiOperation({ summary: 'update album info' })
  @ApiResponse({
    status: 200,
    description: 'updated record if request is valid',
  })
  @ApiResponse({
    status: 400,
    description: 'if albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'if record with id === albumId doesn`t exist',
  })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'delete album' })
  @ApiResponse({
    status: 204,
    description: 'if the record is found and deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'if albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'if record with id === albumId doesn`t exist',
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.remove(id);
  }
}
