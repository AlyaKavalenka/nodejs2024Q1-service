import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private excludePasswordFromResponse(obj: User) {
    const copyObj = { ...obj };
    delete copyObj.password;
    return copyObj;
  }

  async findAll() {
    return (await this.usersRepository.find()).map((user) =>
      this.excludePasswordFromResponse(user),
    );
  }

  async findOne(id: string) {
    const fromDB = await this.usersRepository.findOneBy({ id });
    if (!fromDB) throw new NotFoundException();
    return this.excludePasswordFromResponse(fromDB);
  }

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    const currDate = new Date(Date.now());
    const newUser = new User();
    newUser.login = login;
    newUser.password = password;
    newUser.version = 1;
    newUser.createdAt = currDate;
    newUser.updatedAt = currDate;

    await this.usersRepository.save(newUser);
    return this.excludePasswordFromResponse(newUser);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    const foundUserById = await this.usersRepository.findOneBy({ id });
    if (!!foundUserById) {
      if (foundUserById.password === oldPassword) {
        foundUserById.password = newPassword;
        foundUserById.updatedAt = new Date();
        await this.usersRepository.save(foundUserById);
        return this.excludePasswordFromResponse(foundUserById);
      } else {
        throw new ForbiddenException('OldPassword is wrong');
      }
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    const foundUserById = await this.usersRepository.findOneBy({ id });
    if (!!foundUserById) {
      await this.usersRepository.remove(foundUserById);
      return;
    } else {
      throw new NotFoundException();
    }
  }
}
