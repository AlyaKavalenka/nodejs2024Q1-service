import {
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTrackDto } from './dto/create-track.dto';
// import { UpdateTrackDto } from './dto/update-track.dto';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({ summary: 'Create new track' })
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
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, description: 'All tracks records.' })
  findAll() {
    return this.trackService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.trackService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
  //   return this.trackService.update(+id, updateTrackDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.trackService.remove(+id);
  // }
}
