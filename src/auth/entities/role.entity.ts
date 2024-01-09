import {
    Entity,
    Column,
    OneToMany,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Permission } from './permission.entity';

export enum RoleNames {
    ADMIN = 'ADMIN',
    STATE_MANAGER = 'STATE_MANAGER',
    VOLUNTEER = 'VOLUNTEER'
}

@Entity()
export class Role {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column({
        length: 50
    })
    name: string;

    @OneToMany(() => User, user => user.role)
    user: User[];

    @ManyToMany(() => Role)
    @JoinTable({
        name: 'role_permission',
        joinColumn: {
            name: 'role_id'
        },
        inverseJoinColumn: {
            name: 'permission_id',
        }
    })
    permissions: Permission[];
}