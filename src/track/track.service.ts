import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './entities/track.entity';
import { DbService } from 'src/db/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  tracks: Track[] = [];

  constructor(private db: DbService) {
    this.db.tracks = this.tracks;
  }

  create(createTrackDto: CreateTrackDto) {
    const { artistId, albumId } = createTrackDto;
    const newTrack = {
      ...createTrackDto,
      id: uuidv4(),
      artistId: artistId || null,
      albumId: albumId || null,
    };

    this.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const foundTrack = this.tracks.find((track) => track.id === id);

    if (foundTrack === undefined) throw new NotFoundException();

    return foundTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const foundIndex = this.tracks.findIndex((track) => track.id === id);

    if (foundIndex === -1) throw new NotFoundException();

    this.tracks[foundIndex] = { ...updateTrackDto, id };
    return this.tracks[foundIndex];
  }

  // remove(id: number) {
  //   return `This action removes a #${id} track`;
  // }
}
