export declare class CreateWorkdayLocationDTO {
    title: string;
    description: string;
    locationUrl: string;
    boroughId: number;
}
export declare class UpdateWorkdayLocationDTO extends CreateWorkdayLocationDTO {
    title: string;
    boroughId: number;
}
