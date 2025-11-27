import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LoyaltyService {
    constructor(private prisma: PrismaService) { }

    async getUserStats(userId: string) {
        const profile = await this.prisma.loyaltyProfile.findUnique({
            where: { userId },
            include: { user: { include: { referralCode: true } } }
        });

        if (!profile) {
            // Auto-create profile if missing (for old users)
            return this.createProfile(userId);
        }

        const nextTierPoints = this.getNextTierPoints(profile.tier);
        const progress = Math.min(100, (profile.points / nextTierPoints) * 100);

        return {
            points: profile.points,
            tier: profile.tier,
            nextTier: this.getNextTierName(profile.tier),
            pointsToNextTier: Math.max(0, nextTierPoints - profile.points),
            progress,
            referralCode: profile.user.referralCode?.code || null,
            totalVisits: profile.totalVisits,
        };
    }

    async createProfile(userId: string) {
        const newProfile = await this.prisma.loyaltyProfile.create({
            data: { userId, tier: 'Bronze', points: 0 }
        });
        return {
            points: 0,
            tier: 'Bronze',
            nextTier: 'Silver',
            pointsToNextTier: 500,
            progress: 0,
            referralCode: null,
            totalVisits: 0,
        };
    }

    async addPoints(userId: string, amount: number, reason: string) {
        let profile = await this.prisma.loyaltyProfile.findUnique({ where: { userId } });
        if (!profile) {
            // Create profile if it doesn't exist, but we need to return the full profile object for the logic below
            // For simplicity in this method, we'll just create it and re-fetch or use the return value
            await this.createProfile(userId);
            profile = await this.prisma.loyaltyProfile.findUnique({ where: { userId } });
        }

        if (!profile) return; // Should not happen

        const newPoints = profile.points + amount;
        const newTier = this.calculateTier(newPoints);

        await this.prisma.loyaltyProfile.update({
            where: { userId },
            data: {
                points: newPoints,
                tier: newTier,
                transactions: {
                    create: { points: amount, reason }
                }
            }
        });
    }

    async createReferralCode(userId: string) {
        const code = `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        return this.prisma.referralCode.create({
            data: { userId, code }
        });
    }

    async getLeaderboard() {
        // Get top 5 users by points
        const topUsers = await this.prisma.loyaltyProfile.findMany({
            take: 5,
            orderBy: { points: 'desc' },
            include: { user: { select: { name: true } } }
        });

        return topUsers.map((p, index) => ({
            rank: index + 1,
            name: p.user.name || 'Coffee Lover',
            points: p.points,
            tier: p.tier,
        }));
    }

    private getNextTierPoints(currentTier: string): number {
        if (currentTier === 'Bronze') return 500;
        if (currentTier === 'Silver') return 1500;
        return 5000; // Gold cap
    }

    private getNextTierName(currentTier: string): string {
        if (currentTier === 'Bronze') return 'Silver';
        if (currentTier === 'Silver') return 'Gold';
        return 'Platinum';
    }

    private calculateTier(points: number): string {
        if (points >= 1500) return 'Gold';
        if (points >= 500) return 'Silver';
        return 'Bronze';
    }
}
