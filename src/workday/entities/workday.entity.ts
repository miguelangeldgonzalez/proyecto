import {
    Entity,
    Column,
    ManyToOne,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';

import { TimeStamps } from 'src/common/';

import { MediaType } from './media_type.entity';
import { WorkdayLocation } from './workday_location.entity';
import { ExternalAssistance } from './external_assistance.entity';
import { Volunteer } from 'src/volunteer/entities/volunteer.entity';

@Entity()
export class Workday extends TimeStamps {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'start_time'
    })
    startTime: Date;

    @Column({
        name: 'end_time'
    })
    endTime: Date;

    @Column({
        name: 'media_description',
        nullable: true
    })
    mediaDescription: string;

    @Column({
        name: 'external_assistance_description',
        nullable: true
    })
    externalAssistanceDescription: string;

    @Column({
        name: 'total_external_assistance',
        nullable: true
    })
    totalExternalAssitance: number;

    @ManyToOne(() => WorkdayLocation, { nullable: false })
    @JoinColumn({
        name: 'workday_location_id',
    })
    workdayLocation: WorkdayLocation;

    @ManyToMany(() => MediaType)
    @JoinTable({
        name: 'workday_media_type',
        joinColumn: {
            name: 'workday_id'
        },
        inverseJoinColumn: {
            name: 'media_type_id'
        }
    })
    mediaTypes: MediaType[];

    @ManyToMany(() => ExternalAssistance)
    @JoinTable({
        name: 'workday_external_assistance',
        joinColumn: {
            name: 'workday_id'
        },
        inverseJoinColumn: {
            name: 'external_assistance_id'
        }
    })
    externalAssistance: ExternalAssistance[];

    @ManyToMany(() => Volunteer, volunteer => volunteer.workdays)
    @JoinTable({
        name: 'workday_volunteer',
        joinColumn: {
            name: 'workday_id'
        },
        inverseJoinColumn: {
            name: 'volunteer_id',
        }
    })
    volunteers: Volunteer[];
}

