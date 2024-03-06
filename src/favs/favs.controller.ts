import {
  Controller,
  Delete,
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

  @Post(':type/:id')
  @ApiOperation({ summary: 'Add item to the favorites' })
  @ApiResponse({
    status: 201,
    description: 'Corresponding message if item with id exists',
  })
  @ApiResponse({
    status: 400,
    description: 'Corresponding message if id is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Corresponding message if item with id doesn`t exist',
  })
  @HttpCode(201)
  addToFavorites(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.favsService.addToFav(type, id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.favsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFavDto: UpdateFavDto) {
  //   return this.favsService.update(+id, updateFavDto);
  // }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'delete track from favorites ' })
  @ApiResponse({
    status: 204,
    description:
      'f the track was in favorites and now it`s deleted id is found and deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'corresponding message if trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'corresponding message if corresponding track is not favorite',
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeTrackFromFav(id);
  }
}
