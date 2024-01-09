import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    PrimaryGeneratedColumn
} from 'typeorm';

import { State } from './state.entity';
import { Borough } from './borough.entity';


@Entity()
export class Municipality {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 30,
        unique: true
    })
    name: string;

    @ManyToOne(() => State)
    @JoinColumn({
        name: "state_id"
    })
    state: State;

    @OneToMany(() => Borough, borough => borough.municipality)
    boroughs: Borough[];
} 