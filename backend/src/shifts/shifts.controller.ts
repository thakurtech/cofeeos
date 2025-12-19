import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('shifts')
@UseGuards(JwtAuthGuard)
export class ShiftsController {
    constructor(private readonly shiftsService: ShiftsService) { }

    @Post('start')
    startShift(
        @Body() data: { shopId: string; userId: string; openingCash: number }
    ) {
        return this.shiftsService.startShift(data.shopId, data.userId, data.openingCash);
    }

    @Post(':id/end')
    endShift(
        @Param('id') id: string,
        @Body() data: { closingCash: number; notes?: string }
    ) {
        return this.shiftsService.endShift(id, data.closingCash, data.notes);
    }

    @Get('active')
    getActiveShift(
        @Query('shopId') shopId: string,
        @Query('userId') userId: string
    ) {
        return this.shiftsService.getActiveShift(shopId, userId);
    }

    @Get('history')
    getShiftHistory(
        @Query('shopId') shopId: string,
        @Query('limit') limit?: string
    ) {
        return this.shiftsService.getShiftHistory(shopId, limit ? parseInt(limit) : 20);
    }

    @Get(':id/summary')
    getShiftSummary(@Param('id') id: string) {
        return this.shiftsService.getShiftSummary(id);
    }
}
