import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Volunteer } from 'src/volunteer/entities/volunteer.entity';
import { Count, Regionalities } from '../constants/anlytics.constant';
import { averageAge, averageHasPet, totalCollected, totalVolunteers } from './anlitycs.sql';
import { AverageAgeAnalytic, AverageHasPetAnalytic, GetAnalytic, TotalCollectedAnalytic, TotalVolunteerAnalytic } from '../dto/analytics.dto';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectRepository(Volunteer) private volunteerRepository: Repository<Volunteer>,
    ) {}

     async getAnalytics(regionality: Regionalities, count: Count): Promise<GetAnalytic> {
        switch (count) {
            case Count.AGE:
                return await 
                    this.volunteerRepository.query(averageAge(regionality)) as AverageAgeAnalytic;
            case Count.DONATION: 
                return await 
                    this.volunteerRepository.query(totalCollected(regionality)) as TotalCollectedAnalytic;
            case Count.HAS_PET:
                return await 
                    this.volunteerRepository.query(averageHasPet(regionality)) as AverageHasPetAnalytic;
            case Count.VOLUNTEERS:
                return await
                    this.volunteerRepository.query(totalVolunteers(regionality)) as TotalVolunteerAnalytic;
        }
    }
}
