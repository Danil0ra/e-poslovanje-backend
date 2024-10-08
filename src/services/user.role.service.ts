import { AppDataSource } from "../db";
import { UserRoles } from "../entities/UserRoles";
import { checkIfDefined } from "../utils";

const repo = AppDataSource.getRepository(UserRoles);

export class UserRoleService {
    static async getAllUserRoles(role?: string) {
        const data = await repo.find({
            select: {
                userRolesId: true,
                role: true,
                users: {
                    userId: true,
                    username: true,
                    email: true,
                }
            },
            relations: {
                users: true,
            },
            where: role ? { role: role } : {},
        });

        return checkIfDefined(data);
    }
}
