import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number; // integer number, increments on update

  @Column()
  createdAt: Date; // timestamp of creation

  @Column()
  updatedAt: Date; // timestamp of last update
}
