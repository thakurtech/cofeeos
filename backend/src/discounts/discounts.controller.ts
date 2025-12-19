import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('discounts')
export class DiscountsController {
    constructor(private readonly discountsService: DiscountsService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() data: {
        shopId: string;
        code: string;
        type: 'PERCENTAGE' | 'FIXED' | 'FREE_ITEM';
        value: number;
        minOrder?: number;
        maxDiscount?: number;
        usageLimit?: number;
        validFrom?: Date;
        validUntil?: Date;
    }) {
        return this.discountsService.create(data.shopId, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Query('shopId') shopId: string) {
        return this.discountsService.findAll(shopId);
    }

    @Get('active')
    @UseGuards(JwtAuthGuard)
    findActiveDiscounts(@Query('shopId') shopId: string) {
        return this.discountsService.findActiveDiscounts(shopId);
    }

    // Validate discount - can be called without auth for checkout
    @Post('validate')
    validate(@Body() data: { shopId: string; code: string; orderTotal: number }) {
        return this.discountsService.validate(data.shopId, data.code, data.orderTotal);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id') id: string,
        @Body() data: Partial<{
            code: string;
            value: number;
            minOrder: number;
            maxDiscount: number;
            usageLimit: number;
            validUntil: Date;
            isActive: boolean;
        }>
    ) {
        return this.discountsService.update(id, data);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    delete(@Param('id') id: string) {
        return this.discountsService.delete(id);
    }
}
