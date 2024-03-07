import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { DbService } from 'src/db/db.service';
import { Track } from 'src/track/entities/track.entity';

@Injectable()
export class FavsService {
  constructor(private db: DbService) {}

  findAll() {
    const favorites: {
      artists: Artist[];
      albums: Album[];
      tracks: Track[];
    } = {
      artists: [],
      albums: [],
      tracks: [],
    };

    for (const key in this.db.favs) {
      for (let i = 0; i < this.db[key].length; i++) {
        for (let j = 0; j < this.db.favs[key].length; j++) {
          if (this.db[key][i].id === this.db.favs[key][j])
            favorites[key].push(this.db[key][i]);
        }
      }
    }

    return favorites;
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

    const foundIndexInFavs = this.db.favs[typeS].findIndex(
      (itemId: string) => itemId === id,
    );

    if (foundIndexInFavs === -1) {
      throw new NotFoundException(
        `No ${type} found in favorites with id: ${id}`,
      );
    } else {
      this.db.favs[typeS].splice(foundIndexInFavs, 1);
      return;
    }
  }
}
