import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Album, Artist])],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
