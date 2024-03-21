import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const { artistId } = createAlbumDto;
    const newAlbum = {
      ...createAlbumDto,
      id: uuidv4(),
      artistId: artistId || null,
    };

    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const foundAlbum = this.db.albums.find((album) => album.id === id);

    if (foundAlbum === undefined) throw new NotFoundException();

    return foundAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const foundIndex = this.db.albums.findIndex((album) => album.id === id);

    if (foundIndex === -1) throw new NotFoundException();

    this.db.albums[foundIndex] = { ...updateAlbumDto, id };
    return this.db.albums[foundIndex];
  }

  remove(id: string) {
    const foundIndex = this.db.albums.findIndex((album) => album.id === id);

    if (foundIndex === -1) throw new NotFoundException();

    const foundInTracksIndex = this.db.tracks.findIndex(
      (track) => track.albumId === id,
    );
    if (foundInTracksIndex !== -1)
      this.db.tracks[foundInTracksIndex].albumId = null;

    const foundInFavsIndex = this.db.favs.albums.findIndex(
      (albumId) => albumId === id,
    );
    if (foundInFavsIndex !== -1)
      this.db.favs.albums.splice(foundInFavsIndex, 1);

    this.db.albums.splice(foundIndex, 1);
    return;
  }
}
