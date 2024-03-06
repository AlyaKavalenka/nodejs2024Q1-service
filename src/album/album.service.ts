import { Injectable } from '@nestjs/common';
import { Album } from './entities/album.entity';
import { DbService } from 'src/db/db.service';
// import { CreateAlbumDto } from './dto/create-album.dto';
// import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  albums: Album[] = [];

  constructor(private db: DbService) {
    this.db.albums = this.albums;
  }

  // create(createAlbumDto: CreateAlbumDto) {
  //   return 'This action adds a new album';
  // }
  // findAll() {
  //   return `This action returns all album`;
  // }
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
