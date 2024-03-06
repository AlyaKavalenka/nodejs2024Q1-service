import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './entities/album.entity';
import { DbService } from 'src/db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from './dto/update-album.dto';

// TODO: add check if artistId exist
@Injectable()
export class AlbumService {
  albums: Album[] = [];

  constructor(private db: DbService) {
    this.db.albums = this.albums;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const { artistId } = createAlbumDto;
    const newAlbum = {
      ...createAlbumDto,
      id: uuidv4(),
      artistId: artistId || null,
    };

    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const foundAlbum = this.albums.find((album) => album.id === id);

    if (foundAlbum === undefined) throw new NotFoundException();

    return foundAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const foundIndex = this.albums.findIndex((album) => album.id === id);

    if (foundIndex === -1) throw new NotFoundException();

    this.albums[foundIndex] = { ...updateAlbumDto, id };
    return this.albums[foundIndex];
  }

  remove(id: string) {
    const foundIndex = this.albums.findIndex((album) => album.id === id);

    if (foundIndex === -1) throw new NotFoundException();

    this.albums.splice(foundIndex, 1);
    return;
  }
}
