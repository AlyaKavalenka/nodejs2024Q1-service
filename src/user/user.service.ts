import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DbService } from '../db/db.service';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  excludePasswordFromResponse(obj: User) {
    const copyObj = { ...obj };
    delete copyObj.password;
    return copyObj;
  }

  findAll() {
    return this.db.users.map((user) => this.excludePasswordFromResponse(user));
  }

  findOne(id: string) {
    const foundUser = this.db.users.find((user) => user.id === id);
    if (foundUser === undefined) throw new NotFoundException();

    return this.excludePasswordFromResponse(foundUser);
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

    return this.excludePasswordFromResponse(newUser);
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    const foundIndex = this.db.users.findIndex((user) => user.id === id);
    if (foundIndex !== -1) {
      if (this.db.users[foundIndex].password === oldPassword) {
        this.db.users[foundIndex] = {
          ...this.db.users[foundIndex],
          password: newPassword,
          updatedAt: Date.now(),
          version: this.db.users[foundIndex].version + 1,
        };
        return 'password changed';
      } else {
        throw new ForbiddenException('OldPassword is wrong');
      }
    } else {
      throw new NotFoundException();
    }
  }

  remove(id: string) {
    const foundIndex = this.db.users.findIndex((user) => user.id === id);
    if (foundIndex !== -1) {
      this.db.users.splice(foundIndex, 1);
      return;
    } else {
      throw new NotFoundException();
    }
  }
}
