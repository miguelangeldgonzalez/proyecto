import { User } from '../../user/entities/user.entity';
import { Permission } from './permission.entity';
export declare enum RoleNames {
    ADMIN = "ADMIN",
    STATE_MANAGER = "STATE_MANAGER",
    VOLUNTEER = "VOLUNTEER"
}
export declare class Role {
    id: number;
    name: string;
    user: User[];
    permissions: Permission[];
}
