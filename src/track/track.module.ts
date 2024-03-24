import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from './entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album, Track])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
