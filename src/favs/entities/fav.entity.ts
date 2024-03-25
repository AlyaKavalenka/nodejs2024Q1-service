import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavArtist {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => Artist, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  artist: Artist;
}

@Entity()
export class FavAlbum {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => Album, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  album: Album;
}

@Entity()
export class FavTrack {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => Track, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  track: Track;
}
