import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
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

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    const foundIndex = this.db.users.findIndex((user) => user.id === id);
    if (foundIndex !== -1) {
      if (this.db.users[foundIndex].password === oldPassword) {
        this.db.users[foundIndex].password = newPassword;
        return this.db.users[foundIndex];
      } else {
        throw new ForbiddenException('OldPassword is wrong');
      }
    } else {
      throw new NotFoundException();
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
