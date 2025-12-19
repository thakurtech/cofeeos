import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ShiftsService {
    constructor(private prisma: PrismaService) { }

    async startShift(shopId: string, userId: string, openingCash: number) {
        // Check if there's already an active shift for this user
        const existingShift = await this.prisma.shift.findFirst({
            where: {
                shopId,
                userId,
                status: 'ACTIVE',
            },
        });

        if (existingShift) {
            throw new BadRequestException('You already have an active shift. Please close it first.');
        }

        return this.prisma.shift.create({
            data: {
                shopId,
                userId,
                openingCash,
                status: 'ACTIVE',
            },
        });
    }

    async endShift(shiftId: string, closingCash: number, notes?: string) {
        const shift = await this.prisma.shift.findUnique({
            where: { id: shiftId },
        });

        if (!shift) {
            throw new NotFoundException('Shift not found');
        }

        if (shift.status === 'CLOSED') {
            throw new BadRequestException('Shift is already closed');
        }

        // Calculate expected cash from orders during this shift
        const ordersInShift = await this.prisma.order.aggregate({
            where: {
                shopId: shift.shopId,
                createdAt: {
                    gte: shift.startTime,
                },
                paymentMethod: 'CASH',
                paymentStatus: 'PAID',
            },
            _sum: {
                totalAmount: true,
            },
        });

        const cashFromOrders = ordersInShift._sum.totalAmount || 0;
        const expectedCash = shift.openingCash + cashFromOrders;

        return this.prisma.shift.update({
            where: { id: shiftId },
            data: {
                endTime: new Date(),
                closingCash,
                expectedCash,
                notes,
                status: 'CLOSED',
            },
        });
    }

    async getActiveShift(shopId: string, userId: string) {
        return this.prisma.shift.findFirst({
            where: {
                shopId,
                userId,
                status: 'ACTIVE',
            },
        });
    }

    async getShiftHistory(shopId: string, limit: number = 20) {
        return this.prisma.shift.findMany({
            where: { shopId },
            orderBy: { startTime: 'desc' },
            take: limit,
        });
    }

    async getShiftSummary(shiftId: string) {
        const shift = await this.prisma.shift.findUnique({
            where: { id: shiftId },
        });

        if (!shift) {
            throw new NotFoundException('Shift not found');
        }

        // Get orders during this shift
        const ordersQuery: any = {
            shopId: shift.shopId,
            createdAt: { gte: shift.startTime },
        };

        if (shift.endTime) {
            ordersQuery.createdAt.lte = shift.endTime;
        }

        const orders = await this.prisma.order.findMany({
            where: ordersQuery,
            include: {
                items: { include: { menuItem: true } },
            },
        });

        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        const cashOrders = orders.filter(o => o.paymentMethod === 'CASH');
        const upiOrders = orders.filter(o => o.paymentMethod === 'UPI');
        const cashRevenue = cashOrders.reduce((sum, o) => sum + o.totalAmount, 0);
        const upiRevenue = upiOrders.reduce((sum, o) => sum + o.totalAmount, 0);

        return {
            shift,
            summary: {
                totalOrders,
                totalRevenue,
                cashOrders: cashOrders.length,
                cashRevenue,
                upiOrders: upiOrders.length,
                upiRevenue,
                expectedCash: shift.openingCash + cashRevenue,
                variance: shift.closingCash ? shift.closingCash - (shift.openingCash + cashRevenue) : null,
            },
        };
    }
}
