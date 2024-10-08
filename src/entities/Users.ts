import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reviews } from "./Reviews";
import { UserRoles } from "./UserRoles";

@Index("uq_users_username", ["username"], { unique: true })
@Index("uq_users_email", ["email"], { unique: true })
@Index("fk_user_user_roles_idx", ["userRoleId"], {})
@Entity("users", { schema: "praktikum_esistemi_db" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "username", unique: true, length: 255 })
  username: string;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
  @Column("datetime", {
    name: "deleted_at",
    default: () => "null",
  })
  deletedAt: Date;

  @Column("bool", { name: "active", default: () => "'true'" })
  active: boolean;

  @Column("int", { name: "user_role_id", unsigned: true })
  userRoleId: number;

  @OneToMany(() => Reviews, (reviews) => reviews.user)
  reviews: Reviews[];

  @ManyToOne(() => UserRoles, (userRoles) => userRoles.users, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_role_id", referencedColumnName: "userRolesId" }])
  userRole: UserRoles;
}
