import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    async create(shopId: string, createOrderDto: CreateOrderDto) {
        const { items, customerId, source } = createOrderDto;

        // 1. Calculate Total & Verify Items
        let totalAmount = 0;
        const orderItemsData: { menuItemId: string; quantity: number; price: number }[] = [];

        for (const item of items) {
            const menuItem = await this.prisma.menuItem.findUnique({
                where: { id: item.menuItemId },
            });

            if (!menuItem) continue;

            const itemTotal = menuItem.price * item.quantity;
            totalAmount += itemTotal;

            orderItemsData.push({
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                price: menuItem.price,
            });
        }

        // 2. Create Order
        return this.prisma.order.create({
            data: {
                shopId,
                customerId,
                source: source || 'POS',
                totalAmount,
                shortId: `#${Math.floor(1000 + Math.random() * 9000)}`,
                status: 'PENDING',
                items: {
                    create: orderItemsData,
                },
            },
            include: {
                items: {
                    include: { menuItem: true },
                },
            },
        });
    }

    async getKitchenOrders(shopId: string) {
        return this.prisma.order.findMany({
            where: {
                shopId,
                status: { in: ['PENDING', 'PREPARING'] },
            },
            include: {
                items: {
                    include: { menuItem: true }
                }
            },
            orderBy: { createdAt: 'asc' }
        });
    }

    async updateStatus(orderId: string, status: any) {
        return this.prisma.order.update({
            where: { id: orderId },
            data: { status }
        });
    }

    findAll(shopId: string) {
        return this.prisma.order.findMany({
            where: { shopId },
            include: {
                items: {
                    include: { menuItem: true },
                },
                customer: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    findOne(id: string) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: { menuItem: true },
                },
            },
        });
    }

    update(id: string, updateOrderDto: UpdateOrderDto) {
        return this.prisma.order.update({
            where: { id },
            data: updateOrderDto as any,
        });
    }

    remove(id: string) {
        return this.prisma.order.delete({
            where: { id },
        });
    }
}
