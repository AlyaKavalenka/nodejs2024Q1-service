import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { DbService } from 'src/db/db.service';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
// import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  artists: Artist[];

  constructor(private db: DbService) {
    this.artists = this.db.artists;
  }

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    this.artists.push(newArtist);

    return newArtist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const found = this.artists.find((artist) => artist.id === id);

    if (found === undefined) throw new NotFoundException();

    return found;
  }

  // update(id: number, updateArtistDto: UpdateArtistDto) {
  //   return `This action updates a #${id} artist`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} artist`;
  // }
}
