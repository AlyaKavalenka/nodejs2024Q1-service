import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { CreateFavDto } from './dto/create-fav.dto';
// import { UpdateFavDto } from './dto/update-fav.dto';

@ApiTags('favs')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  // @Post()
  // create(@Body() createFavDto: CreateFavDto) {
  //   return this.favsService.create(createFavDto);
  // }

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: 200, description: 'All favorites records.' })
  findAll() {
    return this.favsService.findAll();
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
