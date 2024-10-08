import { Router } from "express";
import { handleRequest } from "../utils";
import { UserRoleService } from "../services/user.role.service";

export const UserRoleRoute = Router();

UserRoleRoute.get('/', async (req, res) => {
    await handleRequest(res, UserRoleService.getAllUserRoles());
});