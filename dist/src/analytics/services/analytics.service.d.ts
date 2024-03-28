import { Repository } from 'typeorm';
import { Volunteer } from 'src/volunteer/entities/volunteer.entity';
import { Count, Regionalities } from '../constants/anlytics.constant';
import { GetAnalytic } from '../dto/analytics.dto';
export declare class AnalyticsService {
    private volunteerRepository;
    constructor(volunteerRepository: Repository<Volunteer>);
    getAnalytics(regionality: Regionalities, count: Count): Promise<GetAnalytic>;
}
