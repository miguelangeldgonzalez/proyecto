import { Controller, Get, Param, UseGuards } from '@nestjs/common';

// Auth
import { RoleGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { AnalyticsPipe } from '../pipes/validate-params.pipe';
import { Count, Regionalities } from '../constants/anlytics.constant';
import { AnalyticsService } from '../services/analytics.service';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('analytics')
export class AnalyticsController {

    constructor(
        private analyticsService: AnalyticsService
    ) {}

    @Get('/:regionality/:count') 
    async getAnalytics(
        @Param('regionality', AnalyticsPipe) regionality: Regionalities, 
        @Param('count', AnalyticsPipe) count: Count
    ) {
        return this.analyticsService.getAnalytics(regionality, count);
    }
}
