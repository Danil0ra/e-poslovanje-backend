import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Artists } from "./Artists";
import { Reviews } from "./Reviews";
import { Songs } from "./Songs";

@Index("fk_albums_artist_idx", ["artistId"], {})
@Entity("albums", { schema: "praktikum_esistemi_db" })
export class Albums {
  @PrimaryGeneratedColumn({ type: "int", name: "album_id", unsigned: true })
  albumId: number;

  @Column("varchar", { name: "album_image", length: 255 })
  albumImage: string;
  
  @Column("varchar", { name: "album_name", length: 255 })
  albumName: string;

  @Column("varchar", { name: "album_genre", length: 255 })
  albumGenre: string;

  @Column("int", { name: "artist_id", unsigned: true })
  artistId: number;

  @ManyToOne(() => Artists, (artists) => artists.albums, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "artist_id", referencedColumnName: "artistId" }])
  artist: Artists;

  @OneToMany(() => Reviews, (reviews) => reviews.album)
  reviews: Reviews[];

  @OneToMany(() => Songs, (songs) => songs.album)
  songs: Songs[];
}
