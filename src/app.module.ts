import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DOCKER_HOST.toString(),
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME.toString(),
      password: process.env.POSTGRES_PASSWORD.toString(),
      database: process.env.DB_NAME.toString(),
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
