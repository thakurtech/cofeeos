import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AffiliateService {
    constructor(private prisma: PrismaService) { }

    async getStats(userId: string) {
        const affiliate = await this.prisma.affiliateAccount.findUnique({
            where: { userId },
            include: { referrals: true },
        });

        if (!affiliate) {
            throw new NotFoundException('Affiliate account not found');
        }

        const activeReferrals = affiliate.referrals.filter(r => r.status === 'ACTIVE').length;
        const totalEarnings = affiliate.balance; // In a real app, calculate from Payouts + Pending

        // Mocking next payout for demo
        const nextPayoutDate = new Date();
        nextPayoutDate.setDate(nextPayoutDate.getDate() + 30);

        return {
            totalEarnings,
            activeCafes: activeReferrals,
            commissionRate: affiliate.commissionRate,
            nextPayout: {
                amount: activeReferrals * affiliate.commissionRate,
                date: nextPayoutDate,
            },
            referralCode: affiliate.code,
        };
    }

    async getReferrals(userId: string) {
        const affiliate = await this.prisma.affiliateAccount.findUnique({
            where: { userId },
            include: {
                referrals: {
                    include: { shop: true }
                }
            },
        });

        if (!affiliate) {
            throw new NotFoundException('Affiliate account not found');
        }

        return affiliate.referrals.map(ref => ({
            id: ref.id,
            shopName: ref.shop.name,
            status: ref.status,
            joinedAt: ref.createdAt,
            commission: affiliate.commissionRate,
        }));
    }

    async onboardCafe(userId: string, data: { shopName: string; ownerName: string; ownerPhone: string }) {
        const affiliate = await this.prisma.affiliateAccount.findUnique({
            where: { userId },
        });

        if (!affiliate) {
            throw new NotFoundException('Affiliate account not found');
        }

        // 1. Create a placeholder Shop
        const shop = await this.prisma.shop.create({
            data: {
                name: data.shopName,
                slug: data.shopName.toLowerCase().replace(/ /g, '-') + '-' + Math.floor(Math.random() * 1000),
                phone: data.ownerPhone,
            }
        });

        // 2. Link to Affiliate
        await this.prisma.affiliateReferral.create({
            data: {
                affiliateId: affiliate.id,
                shopId: shop.id,
                status: 'TRIAL', // Start as TRIAL
            }
        });

        return { success: true, shopId: shop.id, message: 'Cafe onboarded successfully' };
    }
}
