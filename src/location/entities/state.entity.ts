import {
    Entity,
    Column,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';


import { Municipality } from './municipality.entity';

@Entity()
export class State {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 30,
        unique: true
    })
    name: string;

    @OneToMany(() => Municipality, municipality => municipality.state)
    municipalities: Municipality[];
} 