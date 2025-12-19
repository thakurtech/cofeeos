import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('audit')
@UseGuards(JwtAuthGuard)
export class AuditController {
    constructor(private readonly auditService: AuditService) { }

    @Get()
    getLogs(
        @Query('shopId') shopId: string,
        @Query('userId') userId?: string,
        @Query('action') action?: string,
        @Query('entity') entity?: string,
        @Query('from') from?: string,
        @Query('to') to?: string,
        @Query('limit') limit?: string
    ) {
        return this.auditService.getAuditLogs(shopId, {
            userId,
            action,
            entity,
            from: from ? new Date(from) : undefined,
            to: to ? new Date(to) : undefined,
            limit: limit ? parseInt(limit) : undefined,
        });
    }

    @Get('entity')
    getEntityHistory(
        @Query('entity') entity: string,
        @Query('entityId') entityId: string
    ) {
        return this.auditService.getEntityHistory(entity, entityId);
    }
}
