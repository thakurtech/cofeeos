import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReportsService {
    constructor(private prisma: PrismaService) { }

    async getSalesReport(shopId: string, from: Date, to: Date) {
        const orders = await this.prisma.order.findMany({
            where: {
                shopId,
                createdAt: { gte: from, lte: to },
                status: { not: 'CANCELLED' },
            },
            include: {
                items: { include: { menuItem: true } },
            },
            orderBy: { createdAt: 'desc' },
        });

        // Aggregate by day
        const dailyData: Record<string, { date: string; orders: number; revenue: number }> = {};

        orders.forEach(order => {
            const dateKey = order.createdAt.toISOString().split('T')[0];
            if (!dailyData[dateKey]) {
                dailyData[dateKey] = { date: dateKey, orders: 0, revenue: 0 };
            }
            dailyData[dateKey].orders++;
            dailyData[dateKey].revenue += order.totalAmount;
        });

        const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        const totalOrders = orders.length;
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        // Payment method breakdown
        const cashOrders = orders.filter(o => o.paymentMethod === 'CASH');
        const upiOrders = orders.filter(o => o.paymentMethod === 'UPI');

        return {
            summary: {
                totalRevenue,
                totalOrders,
                avgOrderValue,
                cashRevenue: cashOrders.reduce((sum, o) => sum + o.totalAmount, 0),
                cashOrders: cashOrders.length,
                upiRevenue: upiOrders.reduce((sum, o) => sum + o.totalAmount, 0),
                upiOrders: upiOrders.length,
            },
            dailyData: Object.values(dailyData).sort((a, b) => a.date.localeCompare(b.date)),
            orders,
        };
    }

    async getTopItems(shopId: string, from: Date, to: Date, limit: number = 10) {
        const orderItems = await this.prisma.orderItem.findMany({
            where: {
                order: {
                    shopId,
                    createdAt: { gte: from, lte: to },
                    status: { not: 'CANCELLED' },
                },
            },
            include: { menuItem: true },
        });

        // Aggregate by item
        const itemStats: Record<string, {
            id: string;
            name: string;
            quantity: number;
            revenue: number;
            image?: string;
        }> = {};

        orderItems.forEach(item => {
            if (!itemStats[item.menuItemId]) {
                itemStats[item.menuItemId] = {
                    id: item.menuItemId,
                    name: item.menuItem.name,
                    quantity: 0,
                    revenue: 0,
                    image: item.menuItem.image || undefined,
                };
            }
            itemStats[item.menuItemId].quantity += item.quantity;
            itemStats[item.menuItemId].revenue += item.price * item.quantity;
        });

        return Object.values(itemStats)
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, limit);
    }

    async getDashboardStats(shopId: string) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);

        // Today's stats
        const todayOrders = await this.prisma.order.aggregate({
            where: {
                shopId,
                createdAt: { gte: today },
                status: { not: 'CANCELLED' },
            },
            _count: true,
            _sum: { totalAmount: true },
        });

        // Yesterday's stats for comparison
        const yesterdayOrders = await this.prisma.order.aggregate({
            where: {
                shopId,
                createdAt: { gte: yesterday, lt: today },
                status: { not: 'CANCELLED' },
            },
            _count: true,
            _sum: { totalAmount: true },
        });

        // Week stats
        const weekOrders = await this.prisma.order.aggregate({
            where: {
                shopId,
                createdAt: { gte: weekAgo },
                status: { not: 'CANCELLED' },
            },
            _count: true,
            _sum: { totalAmount: true },
        });

        // Pending orders for kitchen
        const pendingOrders = await this.prisma.order.count({
            where: {
                shopId,
                status: { in: ['PENDING', 'PREPARING'] },
            },
        });

        const todayRevenue = todayOrders._sum.totalAmount || 0;
        const yesterdayRevenue = yesterdayOrders._sum.totalAmount || 0;
        const revenueChange = yesterdayRevenue > 0
            ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100
            : 0;

        return {
            today: {
                orders: todayOrders._count,
                revenue: todayRevenue,
            },
            yesterday: {
                orders: yesterdayOrders._count,
                revenue: yesterdayRevenue,
            },
            week: {
                orders: weekOrders._count,
                revenue: weekOrders._sum.totalAmount || 0,
            },
            revenueChange: Math.round(revenueChange),
            pendingOrders,
        };
    }

    async getHourlyBreakdown(shopId: string, date: Date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const orders = await this.prisma.order.findMany({
            where: {
                shopId,
                createdAt: { gte: startOfDay, lte: endOfDay },
                status: { not: 'CANCELLED' },
            },
        });

        // Aggregate by hour
        const hourlyData: Record<number, { hour: number; orders: number; revenue: number }> = {};

        for (let h = 0; h < 24; h++) {
            hourlyData[h] = { hour: h, orders: 0, revenue: 0 };
        }

        orders.forEach(order => {
            const hour = order.createdAt.getHours();
            hourlyData[hour].orders++;
            hourlyData[hour].revenue += order.totalAmount;
        });

        return Object.values(hourlyData);
    }
}
