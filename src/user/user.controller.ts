import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  ParseUUIDPipe,
  NotFoundException,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
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
    description: 'if request body does not contain required fields',
  })
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update user`s password' })
  @ApiResponse({
    status: 200,
    description: 'updated record if request is valid',
  })
  @ApiResponse({
    status: 400,
    description: 'if userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'if record with id === userId doesn`t exist',
  })
  @ApiResponse({
    status: 403,
    description: 'if oldPassword is wrong',
  })
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'delete user' })
  @ApiResponse({
    status: 204,
    description: 'if the record is found and deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'if userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'if record with id === userId doesn`t exist',
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }
}
