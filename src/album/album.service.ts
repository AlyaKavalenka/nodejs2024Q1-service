import { Injectable } from '@nestjs/common';
import { Album } from './entities/album.entity';
import { DbService } from 'src/db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as uuidv4 } from 'uuid';
// import { UpdateAlbumDto } from './dto/update-album.dto';

// TODO: add check if artistId exist
@Injectable()
export class AlbumService {
  albums: Album[] = [];

  constructor(private db: DbService) {
    this.db.albums = this.albums;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const { artistId } = createAlbumDto;
    const newTrack = {
      ...createAlbumDto,
      id: uuidv4(),
      artistId: artistId || null,
    };

    this.albums.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.albums;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} album`;
  // }
  // update(id: number, updateAlbumDto: UpdateAlbumDto) {
  //   return `This action updates a #${id} album`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} album`;
  // }
}
