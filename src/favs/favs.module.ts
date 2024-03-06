import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { DbService } from 'src/db/db.service';

@Module({
  controllers: [FavsController],
  providers: [FavsService, DbService],
})
export class FavsModule {}
