import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('favs')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: 200, description: 'All favorites records.' })
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'add track to the favorites' })
  @ApiResponse({
    status: 201,
    description: 'corresponding message if track with id === trackId exists',
  })
  @ApiResponse({
    status: 400,
    description: 'corresponding message if trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description:
      'corresponding message if track with id === trackId doesn`t exist',
  })
  @HttpCode(201)
  create(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addToFavTrack(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.favsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFavDto: UpdateFavDto) {
  //   return this.favsService.update(+id, updateFavDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.favsService.remove(+id);
  // }
}
