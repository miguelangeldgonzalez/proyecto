import { Role } from '../../auth/entities/role.entity';
import { Repository } from 'typeorm';
export declare class RoleService {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
    getRoleById(id: number): Promise<Role>;
}
