import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SuperAdminService {
    constructor(private prisma: PrismaService) { }

    async getPlatformStats() {
        // Get total cafes (using shops as proxy)
        const totalCafes = await this.prisma.shop.count();

        // Get total users across all cafes
        const totalUsers = await this.prisma.user.count();

        // Get total orders today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const ordersToday = await this.prisma.order.count({
            where: {
                createdAt: {
                    gte: today
                }
            }
        });

        // Calculate MRR (mock for now - would come from subscription table)
        const mrr = totalCafes * 500; // Assuming ₹500 per cafe per month

        return {
            mrr,
            mrrGrowth: 12.5, // Mock - calculate from historical data
            totalCafes,
            cafeGrowth: 8, // Mock
            activeUsers: totalUsers,
            userGrowth: 15.2, // Mock
            ordersToday,
            orderGrowth: -3.1 // Mock
        };
    }

    async getAllCafes() {
        const cafes = await this.prisma.shop.findMany({
            include: {
                _count: {
                    select: {
                        orders: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return cafes.map(cafe => ({
            id: cafe.id,
            name: cafe.name,
            location: cafe.address || 'N/A',
            totalOrders: cafe._count.orders,
            totalStaff: 0, // Will be calculated when staff relation is added
            status: 'active', // Mock - would come from subscription table
            joinedDate: cafe.createdAt
        }));
    }

    async getRecentSignups() {
        const recentCafes = await this.prisma.shop.findMany({
            take: 5,
            orderBy: {
                createdAt: 'desc'
            }
        });

        return recentCafes.map(cafe => ({
            name: cafe.name,
            location: cafe.address || 'N/A',
            date: this.getRelativeTime(cafe.createdAt),
            status: 'approved' // Mock
        }));
    }

    private getRelativeTime(date: Date): string {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours} hours ago`;
        if (diffDays === 1) return '1 day ago';
        return `${diffDays} days ago`;
    }
}
