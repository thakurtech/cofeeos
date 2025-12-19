import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export type AuditAction =
    | 'ORDER_CREATED'
    | 'ORDER_UPDATED'
    | 'ORDER_CANCELLED'
    | 'ORDER_COMPLETED'
    | 'MENU_UPDATED'
    | 'DISCOUNT_APPLIED'
    | 'SHIFT_STARTED'
    | 'SHIFT_ENDED'
    | 'LOGIN'
    | 'LOGOUT'
    | 'SETTINGS_UPDATED';

interface AuditLogInput {
    userId?: string;
    shopId?: string;
    action: string;
    entity: string;
    entityId?: string;
    oldValue?: any;
    newValue?: any;
    ipAddress?: string;
}

@Injectable()
export class AuditService {
    constructor(private prisma: PrismaService) { }

    async log(input: AuditLogInput): Promise<void> {
        try {
            await this.prisma.auditLog.create({
                data: {
                    userId: input.userId,
                    shopId: input.shopId,
                    action: input.action,
                    entity: input.entity,
                    entityId: input.entityId,
                    oldValue: input.oldValue ? JSON.stringify(input.oldValue) : null,
                    newValue: input.newValue ? JSON.stringify(input.newValue) : null,
                    ipAddress: input.ipAddress,
                },
            });
        } catch (error) {
            // Log errors but don't throw - audit shouldn't break business logic
            console.error('Audit log failed:', error);
        }
    }

    async getAuditLogs(
        shopId: string,
        options: {
            userId?: string;
            action?: string;
            entity?: string;
            from?: Date;
            to?: Date;
            limit?: number;
        } = {}
    ) {
        const { userId, action, entity, from, to, limit = 100 } = options;

        const where: any = { shopId };
        if (userId) where.userId = userId;
        if (action) where.action = action;
        if (entity) where.entity = entity;
        if (from) where.createdAt = { ...where.createdAt, gte: from };
        if (to) where.createdAt = { ...where.createdAt, lte: to };

        return this.prisma.auditLog.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    }

    async getEntityHistory(entity: string, entityId: string) {
        return this.prisma.auditLog.findMany({
            where: {
                entity,
                entityId,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
}
