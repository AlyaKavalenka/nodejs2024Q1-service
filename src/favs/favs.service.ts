import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { DbService } from 'src/db/db.service';
import { Track } from 'src/track/entities/track.entity';
// import { CreateFavDto } from './dto/create-fav.dto';
// import { UpdateFavDto } from './dto/update-fav.dto';

@Injectable()
export class FavsService {
  constructor(private db: DbService) {}

  // create(createFavDto: CreateFavDto) {
  //   return 'This action adds a new fav';
  // }

  findAll() {
    return this.db.favs;
  }

  addToFav(type: string, id: string) {
    let currentDbItem: Album[] | Track[];
    let currentDbFavItem: string[];

    switch (type) {
      case 'track':
        currentDbItem = this.db.tracks;
        currentDbFavItem = this.db.favs.tracks;
        break;

      case 'album':
        currentDbItem = this.db.albums;
        currentDbFavItem = this.db.favs.albums;
        break;

      default:
        break;
    }

    const foundItem = currentDbItem.find((item) => item.id === id);

    if (foundItem === undefined)
      throw new UnprocessableEntityException(`No ${type} found with id: ${id}`);

    currentDbFavItem.push(foundItem.id);

    return currentDbFavItem;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} fav`;
  // }

  // update(id: number, updateFavDto: UpdateFavDto) {
  //   return `This action updates a #${id} fav`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} fav`;
  // }

  removeTrackFromFav(id: string) {
    const foundInFavsTackIndex = this.db.favs.tracks.findIndex(
      (trackId) => trackId === id,
    );

    if (foundInFavsTackIndex === -1) throw new NotFoundException();

    this.db.favs.tracks.splice(foundInFavsTackIndex, 1);
    return;
  }
}
