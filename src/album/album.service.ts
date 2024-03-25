import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { Artist } from 'src/artist/entities/artist.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const { name, artistId, year } = createAlbumDto;

    const foundArtistById = artistId
      ? (await this.artistsRepository.findOneBy({ id: artistId })).id
      : null;

    const newAlbum = new Album();
    newAlbum.name = name;
    newAlbum.artistId = foundArtistById;
    newAlbum.year = year;

    await this.albumsRepository.save(newAlbum);
    return newAlbum;
  }

  async findAll() {
    return await this.albumsRepository.find();
  }

  async findOne(id: string) {
    const foundAlbumById = await this.albumsRepository.findOneBy({ id });

    if (!foundAlbumById) throw new NotFoundException();

    return foundAlbumById;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { name, artistId, year } = updateAlbumDto;

    const foundAlbumById = await this.findOne(id);

    const foundArtistById = artistId
      ? (await this.artistsRepository.findOneBy({ id: artistId })).id
      : null;

    foundAlbumById.name = name;
    foundAlbumById.year = year;
    if (foundArtistById) foundAlbumById.artistId = foundArtistById;

    await this.albumsRepository.save(foundAlbumById);
    return foundAlbumById;
  }

  async remove(id: string) {
    const foundAlbumById = await this.findOne(id);

    await this.albumsRepository.remove(foundAlbumById);

    // TODO: after track and favs
    // const foundInTracksIndex = this.db.tracks.findIndex(
    //   (track) => track.albumId === id,
    // );
    // if (foundInTracksIndex !== -1)
    //   this.db.tracks[foundInTracksIndex].albumId = null;

    // const foundInFavsIndex = this.db.favs.albums.findIndex(
    //   (albumId) => albumId === id,
    // );
    // if (foundInFavsIndex !== -1)
    //   this.db.favs.albums.splice(foundInFavsIndex, 1);

    return;
  }
}
