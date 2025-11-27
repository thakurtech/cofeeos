import { Controller, Get, UseGuards } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('super-admin')
@UseGuards(JwtAuthGuard) // Add RolesGuard for SUPER_ADMIN role check
export class SuperAdminController {
    constructor(private readonly superAdminService: SuperAdminService) { }

    @Get('platform-stats')
    getPlatformStats() {
        return this.superAdminService.getPlatformStats();
    }

    @Get('cafes')
    getAllCafes() {
        return this.superAdminService.getAllCafes();
    }

    @Get('recent-signups')
    getRecentSignups() {
        return this.superAdminService.getRecentSignups();
    }
}
