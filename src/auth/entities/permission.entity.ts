import {
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import { Role } from './role.entity';

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Role)
    role: Role;
}