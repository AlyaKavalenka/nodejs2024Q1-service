import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from './dto/update-track.dto';

// TODO: add check if artistId exist
// TODO: add check if albumId exist
@Injectable()
export class TrackService {
  constructor(private db: DbService) {}

  create(createTrackDto: CreateTrackDto) {
    const { artistId, albumId } = createTrackDto;
    const newTrack = {
      ...createTrackDto,
      id: uuidv4(),
      artistId: artistId || null,
      albumId: albumId || null,
    };

    this.db.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    const foundTrack = this.db.tracks.find((track) => track.id === id);

    if (foundTrack === undefined) throw new NotFoundException();

    return foundTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const foundIndex = this.db.tracks.findIndex((track) => track.id === id);

    if (foundIndex === -1) throw new NotFoundException();

    this.db.tracks[foundIndex] = { ...updateTrackDto, id };
    return this.db.tracks[foundIndex];
  }

  remove(id: string) {
    const foundIndex = this.db.tracks.findIndex((track) => track.id === id);

    if (foundIndex === -1) throw new NotFoundException();

    this.db.tracks.splice(foundIndex, 1);
    return;
  }
}
