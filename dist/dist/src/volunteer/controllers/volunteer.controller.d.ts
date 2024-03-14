import { Volunteer } from '../entities/volunteer.entity';
import { VolunteerService } from '../services/volunteer.service';
import { CreateVolunteerDTO, GetVolunteerDTO } from '../dtos/volunteer.dto';
export declare class VolunteerController {
    private volunteerService;
    constructor(volunteerService: VolunteerService);
    getVolunteer(query: GetVolunteerDTO): Promise<Volunteer>;
    createVolunteer(body: CreateVolunteerDTO): Promise<Volunteer>;
}
