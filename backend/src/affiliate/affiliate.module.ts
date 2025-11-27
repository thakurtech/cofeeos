import { Module } from '@nestjs/common';
import { AffiliateService } from './affiliate.service';
import { AffiliateController } from './affiliate.controller';
import { PrismaService } from '../prisma.service';

@Module({
    controllers: [AffiliateController],
    providers: [AffiliateService, PrismaService],
})
export class AffiliateModule { }
