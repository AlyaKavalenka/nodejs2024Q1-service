import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number; // integer number, increments on update

  @CreateDateColumn()
  createdAt: Date; // timestamp of creation

  @UpdateDateColumn()
  updatedAt: Date; // timestamp of last update
}
