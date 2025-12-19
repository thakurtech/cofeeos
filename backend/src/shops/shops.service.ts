import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ShopsService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.shop.findMany({
            include: {
                _count: {
                    select: { orders: true, users: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findBySlug(slug: string) {
        const shop = await this.prisma.shop.findUnique({
            where: { slug },
            include: {
                menuCategories: {
                    include: {
                        items: true,
                    },
                    orderBy: { sortOrder: 'asc' },
                },
            },
        });

        if (!shop) {
            throw new NotFoundException(`Shop with slug "${slug}" not found`);
        }

        return shop;
    }

    async findById(id: string) {
        const shop = await this.prisma.shop.findUnique({
            where: { id },
        });

        if (!shop) {
            throw new NotFoundException(`Shop with id "${id}" not found`);
        }

        return shop;
    }

    async create(data: {
        name: string;
        slug: string;
        address?: string;
        phone?: string;
        email?: string;
        upiId?: string;
        gstNumber?: string;
        logo?: string;
        themeColor?: string;
        ownerId: string;
    }) {
        const { ownerId, ...shopData } = data;

        // Create shop
        const shop = await this.prisma.shop.create({
            data: {
                ...shopData,
                slug: shopData.slug.toLowerCase().replace(/\s+/g, '-'),
            },
        });

        // Update owner's shopId
        await this.prisma.user.update({
            where: { id: ownerId },
            data: { shopId: shop.id },
        });

        return shop;
    }

    // Create shop with new owner (for super admin cafe creation wizard)
    async createWithOwner(data: {
        // Shop data
        name: string;
        slug: string;
        address?: string;
        phone?: string;
        email?: string;
        upiId?: string;
        themeColor?: string;
        // Owner data
        ownerName: string;
        ownerEmail: string;
        ownerPhone: string;
        ownerPassword?: string;
    }) {
        const bcrypt = require('bcrypt');
        const defaultPassword = data.ownerPassword || 'password';
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        // Create shop first
        const shop = await this.prisma.shop.create({
            data: {
                name: data.name,
                slug: data.slug.toLowerCase().replace(/\s+/g, '-'),
                address: data.address,
                phone: data.phone,
                email: data.email,
                upiId: data.upiId,
                themeColor: data.themeColor,
            },
        });

        // Create owner user linked to shop
        const owner = await this.prisma.user.create({
            data: {
                phone: data.ownerPhone,
                email: data.ownerEmail,
                name: data.ownerName,
                password: hashedPassword,
                role: 'CAFE_OWNER',
                shopId: shop.id,
            },
        });

        return { shop, owner };
    }


    async update(id: string, data: Partial<{
        name: string;
        address: string;
        phone: string;
        email: string;
        upiId: string;
        gstNumber: string;
        fssaiNumber: string;
        logo: string;
        tagline: string;
        themeColor: string;
        isActive: boolean;
    }>) {
        return this.prisma.shop.update({
            where: { id },
            data,
        });
    }

    async getStats(shopId: string) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [todayOrders, todayRevenue, totalOrders, totalCustomers] = await Promise.all([
            // Today's orders
            this.prisma.order.count({
                where: {
                    shopId,
                    createdAt: { gte: today },
                },
            }),
            // Today's revenue
            this.prisma.order.aggregate({
                where: {
                    shopId,
                    createdAt: { gte: today },
                    status: { not: 'CANCELLED' },
                },
                _sum: { totalAmount: true },
            }),
            // Total orders
            this.prisma.order.count({
                where: { shopId },
            }),
            // Total unique customers
            this.prisma.order.groupBy({
                by: ['customerId'],
                where: {
                    shopId,
                    customerId: { not: null },
                },
            }),
        ]);

        return {
            todayOrders,
            todayRevenue: todayRevenue._sum.totalAmount || 0,
            totalOrders,
            totalCustomers: totalCustomers.length,
        };
    }
}
