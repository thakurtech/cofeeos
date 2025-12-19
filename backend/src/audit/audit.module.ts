import { Module, Global } from '@nestjs/common';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { PrismaService } from '../prisma.service';

@Global() // Make audit service available everywhere
@Module({
    controllers: [AuditController],
    providers: [AuditService, PrismaService],
    exports: [AuditService],
})
export class AuditModule { }
