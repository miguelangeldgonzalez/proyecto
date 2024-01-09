import {
    Entity,
    Column,
    ManyToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import { Workday } from './workday.entity';

@Entity()
export class MediaType {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column({
        length: 50
    })
    name: string;

    @ManyToMany(() => Workday)
    workday: Workday[];
}