import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class GeneralSettings {
  @PrimaryGeneratedColumn("uuid")
  id: string; 

  @Column()
  settingsName: string;

  @Column()
  settings:string;
}
