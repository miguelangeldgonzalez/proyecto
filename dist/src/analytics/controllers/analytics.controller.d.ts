import { Count, Regionalities } from '../constants/anlytics.constant';
import { AnalyticsService } from '../services/analytics.service';
export declare class AnalyticsController {
    private analyticsService;
    constructor(analyticsService: AnalyticsService);
    getAnalytics(regionality: Regionalities, count: Count): Promise<import("../dto/analytics.dto").GetAnalytic>;
}
