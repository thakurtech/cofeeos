import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DiscountsService {
    constructor(private prisma: PrismaService) { }

    async create(shopId: string, data: {
        code: string;
        type: 'PERCENTAGE' | 'FIXED' | 'FREE_ITEM';
        value: number;
        minOrder?: number;
        maxDiscount?: number;
        usageLimit?: number;
        validFrom?: Date;
        validUntil?: Date;
    }) {
        // Check if code already exists for this shop
        const existing = await this.prisma.discount.findFirst({
            where: { shopId, code: data.code.toUpperCase() },
        });

        if (existing) {
            throw new BadRequestException(`Discount code "${data.code}" already exists`);
        }

        return this.prisma.discount.create({
            data: {
                shopId,
                code: data.code.toUpperCase(),
                type: data.type,
                value: data.value,
                minOrder: data.minOrder || 0,
                maxDiscount: data.maxDiscount,
                usageLimit: data.usageLimit,
                validFrom: data.validFrom || new Date(),
                validUntil: data.validUntil,
                isActive: true,
            },
        });
    }

    async findAll(shopId: string) {
        return this.prisma.discount.findMany({
            where: { shopId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findActiveDiscounts(shopId: string) {
        const now = new Date();
        return this.prisma.discount.findMany({
            where: {
                shopId,
                isActive: true,
                validFrom: { lte: now },
                OR: [
                    { validUntil: null },
                    { validUntil: { gte: now } },
                ],
            },
        });
    }

    async validate(shopId: string, code: string, orderTotal: number) {
        const now = new Date();
        const discount = await this.prisma.discount.findFirst({
            where: {
                shopId,
                code: code.toUpperCase(),
                isActive: true,
                validFrom: { lte: now },
                OR: [
                    { validUntil: null },
                    { validUntil: { gte: now } },
                ],
            },
        });

        if (!discount) {
            return { valid: false, message: 'Invalid or expired discount code' };
        }

        if (discount.usageLimit && discount.usageCount >= discount.usageLimit) {
            return { valid: false, message: 'Discount code usage limit reached' };
        }

        if (orderTotal < discount.minOrder) {
            return {
                valid: false,
                message: `Minimum order amount of ₹${discount.minOrder} required`
            };
        }

        // Calculate discount amount
        let discountAmount = 0;
        if (discount.type === 'PERCENTAGE') {
            discountAmount = (orderTotal * discount.value) / 100;
            if (discount.maxDiscount) {
                discountAmount = Math.min(discountAmount, discount.maxDiscount);
            }
        } else if (discount.type === 'FIXED') {
            discountAmount = Math.min(discount.value, orderTotal);
        }

        return {
            valid: true,
            discount,
            discountAmount,
            finalAmount: orderTotal - discountAmount,
        };
    }

    async update(id: string, data: Partial<{
        code: string;
        value: number;
        minOrder: number;
        maxDiscount: number;
        usageLimit: number;
        validUntil: Date;
        isActive: boolean;
    }>) {
        return this.prisma.discount.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        return this.prisma.discount.delete({
            where: { id },
        });
    }
}
