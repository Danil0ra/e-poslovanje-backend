import { configDotenv } from "dotenv";
import { DataSource } from "typeorm";
import { Albums } from "./entities/Albums";
import { Artists } from "./entities/Artists";
import { Reviews } from "./entities/Reviews";
import { Songs } from "./entities/Songs";
import { UserRoles } from "./entities/UserRoles";
import { Users } from "./entities/Users";

configDotenv()
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number.parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Albums, Artists, Reviews, Songs, UserRoles, Users],
    logging: false
})

