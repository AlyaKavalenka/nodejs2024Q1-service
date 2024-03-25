import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const { artistId, albumId, duration, name } = createTrackDto;

    const foundArtistById = artistId
      ? (await this.artistsRepository.findOneBy({ id: artistId })).id
      : null;

    const foundAlbumById = albumId
      ? (await this.albumsRepository.findOneBy({ id: albumId })).id
      : null;

    const newTrack = new Track();
    newTrack.name = name;
    newTrack.duration = duration;
    newTrack.artistId = foundArtistById;
    newTrack.albumId = foundAlbumById;

    await this.tracksRepository.save(newTrack);
    return newTrack;
  }

  async findAll() {
    return await this.tracksRepository.find();
  }

  async findOne(id: string) {
    const foundTrack = await this.tracksRepository.findOneBy({ id });

    if (!foundTrack) throw new NotFoundException();

    return foundTrack;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const { name, duration, artistId, albumId } = updateTrackDto;

    const foundTrackById = await this.findOne(id);
    foundTrackById.name = name || foundTrackById.name;
    foundTrackById.duration = duration || foundTrackById.duration;
    if (artistId)
      foundTrackById.artistId = (
        await this.artistsRepository.findOneBy({
          id: artistId,
        })
      ).id;
    if (albumId)
      foundTrackById.albumId = (
        await this.albumsRepository.findOneBy({
          id: albumId,
        })
      ).id;

    await this.tracksRepository.save(foundTrackById);

    return foundTrackById;
  }

  async remove(id: string) {
    const foundTrackById = await this.findOne(id);

    // TODO: after favs
    // const foundInFavsIndex = this.db.favs.tracks.findIndex(
    //   (trackId) => trackId === id,
    // );
    // if (foundInFavsIndex !== -1)
    //   this.db.favs.tracks.splice(foundInFavsIndex, 1);

    await this.tracksRepository.remove(foundTrackById);
    return;
  }
}
