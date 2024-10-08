
import { configDotenv } from "dotenv";
import { AppDataSource } from "../db";
import { Users } from "../entities/Users";
import { checkIfDefined } from "../utils";
import { LoginModel } from "../models/login.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const repo = AppDataSource.getRepository(Users)


configDotenv()
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const accessExpire = process.env.ACCESS_TOKEN_TTL;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshExpire = process.env.REFRESH_TOKEN_TTL;

export class UserService {

    static async login(model: LoginModel) {
        const user: Users = await this.getUserByUsername(model.username)
        if (await bcrypt.compare(model.password, user.password))
            return {
                username:user.username,
                access: jwt.sign({ name: model.username }, accessSecret, { expiresIn: accessExpire }),
                refresh: jwt.sign({ name: model.username }, refreshSecret, { expiresIn: refreshExpire })
            };
            throw new Error("BAD_CREDENTIALS")
    }


    public static async refreshToken(refresh: string) {
        try {
            const decoded: any = jwt.verify(refresh, refreshSecret as string)
            return {
                username:decoded.name,
                access: jwt.sign({ name: decoded.name }, accessSecret, { expiresIn: accessExpire }),
                refresh: refresh
            }
        } catch (err) {
            throw new Error('REFRESH_FAILED');
        }
    }


    static async getUserByUsername(username: string) {
        const data = await repo.findOne({
            where: {
                active: true,
                username: username
            }
        })
        return checkIfDefined(data)
    }






    // static async getAllUsers() {
    //     const data = await repo.find({
    //         select: {
    //             userId: true,
    //             username: true,
    //             email: true,
    //             active: true,
    //             createdAt: true,
    //             userRoleId: true
    //         },
    //         where: {
    //             active: true
    //         },
    //     });

    //     return checkIfDefined(data)
    // }
}

