import { RoleNames } from "../entities/role.entity";
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: RoleNames[]) => import("@nestjs/common").CustomDecorator<string>;
