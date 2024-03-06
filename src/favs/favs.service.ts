import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
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

  addToFavTrack(id: string) {
    const foundTrack = this.db.tracks.find((track) => track.id === id);

    if (foundTrack === undefined) throw new UnprocessableEntityException();

    this.db.favs.tracks.push(foundTrack.id);

    return this.db.favs.tracks;
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
}
