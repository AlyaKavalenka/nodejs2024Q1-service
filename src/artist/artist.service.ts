import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;
    const newArtist = new Artist();
    newArtist.name = name;
    newArtist.grammy = grammy;

    await this.artistsRepository.save(newArtist);

    return newArtist;
  }

  async findAll() {
    return await this.artistsRepository.find();
  }

  async findOne(id: string) {
    const foundArtistById = await this.artistsRepository.findOneBy({ id });

    if (!foundArtistById) throw new NotFoundException();

    return foundArtistById;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    let foundArtistById = await this.findOne(id);
    if (!foundArtistById) {
      throw new NotFoundException();
    } else {
      foundArtistById = { id, ...updateArtistDto };
      await this.artistsRepository.save(foundArtistById);
      return foundArtistById;
    }
  }

  async remove(id: string) {
    const foundArtistById = await this.findOne(id);

    if (!foundArtistById) {
      throw new NotFoundException();
    } else {
      await this.artistsRepository.remove(foundArtistById);

      return;
    }
  }
}
