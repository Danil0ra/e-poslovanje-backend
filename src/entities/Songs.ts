import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Albums } from "./Albums";

@Index("fk_songs_album_idx", ["albumId"], {})
@Entity("songs", { schema: "praktikum_esistemi_db" })
export class Songs {
  @PrimaryGeneratedColumn({ type: "int", name: "song_id", unsigned: true })
  songId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "album_id", unsigned: true })
  albumId: number;

  @ManyToOne(() => Albums, (albums) => albums.songs, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "album_id", referencedColumnName: "albumId" }])
  album: Albums;
}
