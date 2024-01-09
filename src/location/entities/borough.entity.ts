import {
    Entity,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn
} from 'typeorm';

import { Municipality } from './municipality.entity';
import { WorkdayLocation } from 'src/workday/entities/workday_location.entity';

@Entity()
export class Borough {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 30,
        unique: true
    })
    name: string;

    @ManyToOne(() => Municipality)
    @JoinColumn({
        name: 'municipality_id'
    })
    municipality: Municipality;

    @OneToMany(() => WorkdayLocation, workdayLocation => workdayLocation.borough)
    workdaysLocations: WorkdayLocation[];
} 