import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('shops')
export class ShopsController {
    constructor(private readonly shopsService: ShopsService) { }

    // Get all shops (Super Admin only)
    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.shopsService.findAll();
    }

    // Get shop by slug (public for menu viewing)
    @Get(':slug')
    findBySlug(@Param('slug') slug: string) {
        return this.shopsService.findBySlug(slug);
    }

    // Get shop by ID (authenticated)
    @Get('by-id/:id')
    @UseGuards(JwtAuthGuard)
    findById(@Param('id') id: string) {
        return this.shopsService.findById(id);
    }

    // Get shop stats
    @Get(':id/stats')
    @UseGuards(JwtAuthGuard)
    getStats(@Param('id') id: string) {
        return this.shopsService.getStats(id);
    }

    // Create new shop (Super Admin only)
    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() data: {
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
        return this.shopsService.create(data);
    }

    // Create shop with new owner (for cafe creation wizard)
    @Post('with-owner')
    @UseGuards(JwtAuthGuard)
    createWithOwner(@Body() data: {
        name: string;
        slug: string;
        address?: string;
        phone?: string;
        email?: string;
        upiId?: string;
        themeColor?: string;
        ownerName: string;
        ownerEmail: string;
        ownerPhone: string;
        ownerPassword?: string;
    }) {
        return this.shopsService.createWithOwner(data);
    }

    // Update shop
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id') id: string,
        @Body() data: Partial<{
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
        }>
    ) {
        return this.shopsService.update(id, data);
    }
}
