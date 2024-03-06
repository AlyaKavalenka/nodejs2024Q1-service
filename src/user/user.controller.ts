import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  // Patch,
  Param,
  ParseUUIDPipe,
  NotFoundException,
  // Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'All users records.' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single user by id' })
  @ApiResponse({
    status: 200,
    description: 'if record with id === userId if it exists',
  })
  @ApiResponse({
    status: 400,
    description: 'if userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'if record with id === userId doesn`t exist',
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const foundUser = this.userService.findOne(id);
    if (foundUser === undefined) throw new NotFoundException();
    return foundUser;
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'newly created record if request is valid',
  })
  @ApiResponse({
    status: 400,
    description:
      'corresponding message if request body does not contain required fields',
  })
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
