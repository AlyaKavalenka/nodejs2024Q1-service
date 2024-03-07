import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FavsService {
  constructor(private db: DbService) {}

  findAll() {
    return this.db.favs;
  }

  addToFav(type: string, id: string) {
    const typeS = type + 's';

    const foundItem = this.db[typeS].find(
      (item: { id: string }) => item.id === id,
    );

    if (foundItem === undefined)
      throw new UnprocessableEntityException(`No ${type} found with id: ${id}`);

    this.db.favs[typeS].push(foundItem.id);

    return this.db.favs[typeS];
  }

  removeItemFromFav(type: string, id: string) {
    const typeS = type + 's';

    const index = this.db.favs[typeS].findIndex(
      (itemId: string) => itemId === id,
    );

    if (index === -1) {
      throw new NotFoundException(
        `No ${type} found in favorites with id: ${id}`,
      );
    }

    this.db.favs[typeS].splice(index, 1);
  }
}
