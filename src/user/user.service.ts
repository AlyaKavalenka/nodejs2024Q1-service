import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  findAll() {
    return this.db.users;
  }

  findOne(id: string) {
    return this.db.users.find((user) => user.id === id);
  }

  create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    const currDate = Date.now();
    const newUser = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: currDate,
      updatedAt: currDate,
    };

    this.db.users.push(newUser);

    return newUser;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
