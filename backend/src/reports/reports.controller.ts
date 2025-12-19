import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Get('sales')
    getSalesReport(
        @Query('shopId') shopId: string,
        @Query('from') from: string,
        @Query('to') to: string
    ) {
        return this.reportsService.getSalesReport(
            shopId,
            new Date(from),
            new Date(to)
        );
    }

    @Get('top-items')
    getTopItems(
        @Query('shopId') shopId: string,
        @Query('from') from: string,
        @Query('to') to: string,
        @Query('limit') limit?: string
    ) {
        return this.reportsService.getTopItems(
            shopId,
            new Date(from),
            new Date(to),
            limit ? parseInt(limit) : 10
        );
    }

    @Get('dashboard')
    getDashboardStats(@Query('shopId') shopId: string) {
        return this.reportsService.getDashboardStats(shopId);
    }

    @Get('hourly')
    getHourlyBreakdown(
        @Query('shopId') shopId: string,
        @Query('date') date: string
    ) {
        return this.reportsService.getHourlyBreakdown(shopId, new Date(date));
    }
}
