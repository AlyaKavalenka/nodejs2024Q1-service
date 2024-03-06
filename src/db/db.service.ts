import { Injectable } from '@nestjs/common';
import { Artist, User } from 'src/types/types';

@Injectable()
export class DbService {
  users: User[] = [];
  artists: Artist[] = [];
}
