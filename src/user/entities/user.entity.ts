import {
    Entity,
    Column,
    ManyToOne,
    JoinTable,
    JoinColumn,
    ManyToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import { Role } from '../../auth/entities/role.entity';
import { State } from 'src/location/entities/state.entity';

import { TimeStamps } from 'src/common/';

@Entity()
export class User extends TimeStamps{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        nullable: true
    })
    password: string;

    @ManyToMany(() => State)
    @JoinTable({
        name: 'user_state',
        joinColumn: {
            name: 'user_id'
        },
        inverseJoinColumn: {
            name: 'state_id'
        }
    })
    states: State[]

    @ManyToOne(() => Role)
    @JoinColumn({
        name: "role_id"
    })
    role: Role;
}