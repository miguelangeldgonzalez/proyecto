interface BaseAnalytics {
    name: string;
}
export interface AverageAgeAnalytic extends BaseAnalytics {
    averageAge: number;
}
export interface TotalCollectedAnalytic extends BaseAnalytics {
    totalCollected: number;
}
export interface AverageHasPetAnalytic extends BaseAnalytics {
    averageHasPet: number;
}
export interface TotalVolunteerAnalytic extends BaseAnalytics {
    totalVolunteers: number;
}
export type GetAnalytic = AverageAgeAnalytic | TotalCollectedAnalytic | AverageHasPetAnalytic | TotalVolunteerAnalytic;
export {};
