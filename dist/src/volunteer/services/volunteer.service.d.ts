import { Repository } from 'typeorm';
import { ZoneService } from 'src/location/services/zone.service';
import { WorkdayService } from 'src/workday/services/workday.service';
import { Volunteer } from '../entities/volunteer.entity';
import { CreateVolunteerDTO, GetVolunteerDTO } from '../dtos/volunteer.dto';
export declare class VolunteerService {
    private zoneService;
    private workdayService;
    private volunteerRepository;
    constructor(zoneService: ZoneService, workdayService: WorkdayService, volunteerRepository: Repository<Volunteer>);
    getVolunteer(query: GetVolunteerDTO): Promise<Volunteer>;
    createVolunteer(data: CreateVolunteerDTO): Promise<Volunteer>;
}
