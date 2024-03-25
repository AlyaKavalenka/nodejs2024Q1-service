import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('integer')
  duration: number; // integer number

  @ManyToOne(() => Artist, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
    orphanedRowAction: 'nullify',
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artistId: string;

  @ManyToOne(() => Album, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
    orphanedRowAction: 'nullify',
  })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  albumId: string;
}
