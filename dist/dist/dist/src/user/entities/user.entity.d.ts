import { Role } from '../../auth/entities/role.entity';
import { State } from 'src/location/entities/state.entity';
import { TimeStamps } from 'src/common/';
export declare class User extends TimeStamps {
    id: number;
    name: string;
    email: string;
    password: string;
    states: State[];
    role: Role;
}
