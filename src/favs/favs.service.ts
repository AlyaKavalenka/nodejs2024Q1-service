import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { FavAlbum, FavArtist, FavTrack } from './entities/fav.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavArtist)
    private favArtistsRepo: Repository<FavArtist>,
    @InjectRepository(FavAlbum)
    private favAlbumsRepo: Repository<FavAlbum>,
    @InjectRepository(FavTrack)
    private favTracksRepo: Repository<FavTrack>,
    @InjectRepository(Artist)
    private readonly artistsRepo: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumsRepo: Repository<Album>,
    @InjectRepository(Track)
    private readonly tracksRepo: Repository<Track>,
  ) {}

  async findAll() {
    return {
      artists: await this.favArtistsRepo.find(),
      albums: await this.favAlbumsRepo.find(),
      tracks: await this.favTracksRepo.find(),
    };
  }

  private is422(foundItem: any, type: string, id: string) {
    if (!foundItem)
      throw new UnprocessableEntityException(`No ${type} found with id: ${id}`);
  }

  async addToFav(type: string, id: string) {
    let foundItem = null;
    let newItem = null;
    switch (type) {
      case 'artist':
        foundItem = await this.artistsRepo.findOneBy({ id });
        this.is422(foundItem, type, id);
        newItem = new FavArtist();
        newItem.artists = foundItem;
        await this.favArtistsRepo.save(newItem);
        break;

      case 'album':
        foundItem = await this.albumsRepo.findOneBy({ id });
        this.is422(foundItem, type, id);
        newItem = new FavAlbum();
        newItem.albums = foundItem;
        await this.favAlbumsRepo.save(newItem);
        break;

      case 'tracks':
        foundItem = await this.tracksRepo.findOneBy({ id });
        this.is422(foundItem, type, id);
        newItem = new FavTrack();
        newItem.tracks = foundItem;
        await this.favTracksRepo.save(newItem);
        break;

      default:
        break;
    }

    return newItem;
  }

  private is404(foundItemInFavs: any, type: string, id: string) {
    if (!foundItemInFavs) {
      throw new NotFoundException(
        `No ${type} found in favorites with id: ${id}`,
      );
    }
  }

  async removeItemFromFav(type: string, id: string) {
    let foundItemInFavs = null;
    switch (type) {
      case 'artist':
        foundItemInFavs = await this.favArtistsRepo.findOneBy({ id });
        this.is404(foundItemInFavs, type, id);
        await this.favArtistsRepo.remove(foundItemInFavs);
        break;

      case 'album':
        foundItemInFavs = await this.favAlbumsRepo.findOneBy({ id });
        this.is404(foundItemInFavs, type, id);
        await this.favAlbumsRepo.remove(foundItemInFavs);
        break;

      case 'track':
        foundItemInFavs = await this.favTracksRepo.findOneBy({ id });
        this.is404(foundItemInFavs, type, id);
        await this.favTracksRepo.remove(foundItemInFavs);
        break;

      default:
        break;
    }

    return;
  }
}
