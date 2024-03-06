import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { DbService } from 'src/db/db.service';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private db: DbService) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    this.db.artists.push(newArtist);

    return newArtist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string) {
    const found = this.db.artists.find((artist) => artist.id === id);

    if (found === undefined) throw new NotFoundException();

    return found;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const foundIndex = this.db.artists.findIndex((artist) => artist.id === id);
    if (foundIndex === -1) {
      throw new NotFoundException();
    } else {
      this.db.artists[foundIndex] = { ...updateArtistDto, id };
      return this.db.artists[foundIndex];
    }
  }

  remove(id: string) {
    const foundIndex = this.db.artists.findIndex((artist) => artist.id === id);

    if (foundIndex === -1) {
      throw new NotFoundException();
    } else {
      this.db.artists.splice(foundIndex, 1);
      return;
    }
  }
}
