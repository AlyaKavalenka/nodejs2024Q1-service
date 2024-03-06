import { Injectable } from '@nestjs/common';
import { Track } from './entities/track.entity';
import { DbService } from 'src/db/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
// import { UpdateTrackDto } from './dto/update-track.dto';

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

  // findOne(id: number) {
  //   return `This action returns a #${id} track`;
  // }

  // update(id: number, updateTrackDto: UpdateTrackDto) {
  //   return `This action updates a #${id} track`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} track`;
  // }
}
