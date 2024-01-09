import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../auth/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
    ) {}

    async getRoleById(id: number) {
        const role =  await this.roleRepository.findOne({
            where: { id }
        })

        if (!role) throw new NotFoundException({
            message: `No existe un role con el id ${id}`
        })

        return role;
    }
}
