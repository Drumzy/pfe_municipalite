import { SetMetadata } from "@nestjs/common";
import { Role } from "../../../utils/enums/employeRole.enum";

export const ROLES_KEY = 'Roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);