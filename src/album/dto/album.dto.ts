import { Album } from '../entities/album.entity';

export class AlbumDto {
  id: string;

  name: string;

  year: number;

  artistId: string;

  static convert(album: Album) {
    const dto = new AlbumDto();

    dto.id = album.id;
    dto.name = album.name;
    dto.year = album.year;
    dto.artistId = album.artistId ? album.artistId.id : null;

    return dto;
  }
}
