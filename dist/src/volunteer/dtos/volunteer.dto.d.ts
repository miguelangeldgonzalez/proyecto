export declare class GetVolunteerDTO {
    id: number;
    identification: number;
}
export declare class CreateVolunteerDTO {
    identification: number;
    name: string;
    phone: string;
    hasPet: boolean;
    birthDate: Date;
    boroughId: number;
    workdayId: number;
}
