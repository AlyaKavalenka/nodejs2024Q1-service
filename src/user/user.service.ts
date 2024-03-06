import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DbService } from 'src/db/db.service';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  users: User[] = [];

  constructor(private db: DbService) {
    this.db.users = this.users;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
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

    this.users.push(newUser);

    return newUser;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    const foundIndex = this.users.findIndex((user) => user.id === id);
    if (foundIndex !== -1) {
      if (this.users[foundIndex].password === oldPassword) {
        this.users[foundIndex] = {
          ...this.users[foundIndex],
          password: newPassword,
          updatedAt: Date.now(),
          version: this.users[foundIndex].version + 1,
        };
        return this.users[foundIndex];
      } else {
        throw new ForbiddenException('OldPassword is wrong');
      }
    } else {
      throw new NotFoundException();
    }
  }

  remove(id: string) {
    const foundIndex = this.users.findIndex((user) => user.id === id);
    if (foundIndex !== -1) {
      this.users.splice(foundIndex, 1);
      return;
    } else {
      throw new NotFoundException();
    }
  }
}
