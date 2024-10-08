import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Albums } from "./Albums";
import { Users } from "./Users";

@Index("fk_reviews_user_idx", ["userId"], {})
@Index("fk_reviews_album_idx", ["albumId"], {})
@Entity("reviews", { schema: "praktikum_esistemi_db" })
export class Reviews {
  @PrimaryGeneratedColumn({ type: "int", name: "review_id", unsigned: true })
  reviewId: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("int", { name: "album_id", unsigned: true })
  albumId: number;

  @Column("int", { name: "rating" })
  rating: number;

  @Column("text", { name: "review_text" })
  reviewText: string;

  @Column("varchar", {
    name: "moderation_status",
    length: 255,
    default: () => "'PENDING'",
  })
  moderationStatus: string;

  @ManyToOne(() => Albums, (albums) => albums.reviews, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "album_id", referencedColumnName: "albumId" }])
  album: Albums;

  @ManyToOne(() => Users, (users) => users.reviews, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;
}
