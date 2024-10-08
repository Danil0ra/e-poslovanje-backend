import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Albums } from "./Albums";

@Index("artist_name_UNIQUE", ["artistName"], { unique: true })
@Entity("artists", { schema: "praktikum_esistemi_db" })
export class Artists {
  @PrimaryGeneratedColumn({ type: "int", name: "artist_id", unsigned: true })
  artistId: number;

  @Column("varchar", { name: "artist_image", length: 255 })
  artistImage: string;

  @Column("varchar", { name: "artist_name", unique: true, length: 255 })
  artistName: string;

  @Column("varchar", { name: "artist_genre", length: 255 })
  artistGenre: string;

  @Column("text", { name: "artist_bio" })
  artistBio: string;

  @OneToMany(() => Albums, (albums) => albums.artist)
  albums: Albums[];
}
