import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { TimeStamps } from 'src/common/';

import { Workday } from './workday.entity';
import { Borough } from 'src/location/entities/borough.entity';

@Entity()
export class WorkdayLocation extends TimeStamps {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    description: string;

    @Column()
    title: string;

    @Column({
        nullable: true
    })
    locationUrl: string;

    @OneToMany(() => Workday, workday => workday.workdayLocation)
    workdays: Workday[];

    @ManyToOne(() => Borough, {
        nullable: false
    })
    @JoinColumn({
        name: 'borough_id',
    })
    borough: Borough;
}