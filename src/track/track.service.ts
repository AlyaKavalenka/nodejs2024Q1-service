import { Injectable } from '@nestjs/common';
import { Track } from './entities/track.entity';
import { DbService } from 'src/db/db.service';
// import { CreateTrackDto } from './dto/create-track.dto';
// import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  tracks: Track[] = [];

  constructor(private db: DbService) {
    this.db.tracks = this.tracks;
  }

  // create(createTrackDto: CreateTrackDto) {
  //   return 'This action adds a new track';
  // }

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
