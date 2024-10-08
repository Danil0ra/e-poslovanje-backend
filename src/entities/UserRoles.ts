import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Entity("user_roles", { schema: "praktikum_esistemi_db" })
export class UserRoles {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "user_roles_id",
    unsigned: true,
  })
  userRolesId: number;

  @Column("varchar", { name: "role", length: 255 })
  role: string;

  @OneToMany(() => Users, (users) => users.userRole)
  users: Users[];
}
