import {
    Entity,
    Column,
    ManyToOne,
    ManyToMany,
    JoinColumn,
    PrimaryGeneratedColumn
} from 'typeorm';

import { TimeStamps } from 'src/common/';

// Entities
import { Workday } from 'src/workday/entities/workday.entity';
import { Borough } from 'src/location/entities/borough.entity';

@Entity()
export class Volunteer extends TimeStamps {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    identification: number;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    phone: string

    @Column({
        name: 'has_pet',
        nullable: true
    })
    hasPet: boolean

    @Column({
        name: 'birth_date',
        nullable: true
    })
    birthDate: Date;

    @ManyToOne(() => Borough, { nullable: false })
    @JoinColumn({
        name: "borough_id"
    })
    borough: Borough;

    @ManyToMany(() => Workday, workday => workday.volunteers, { nullable: false })
    workdays: Workday[];
}