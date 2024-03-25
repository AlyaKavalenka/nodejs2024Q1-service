import { Track } from 'src/track/entities/track.entity';

export class FavTrackDto {
  id: string;

  name: string;

  duration: number;

  artistId: string;

  albumId: string;

  static convert(track: Track) {
    const dto = new FavTrackDto();

    dto.id = track.id;
    dto.name = track.name;
    dto.duration = track.duration;
    dto.artistId = track.artistId ? track.artistId.id : null;
    dto.albumId = track.albumId ? track.albumId.id : null;

    return dto;
  }
}
