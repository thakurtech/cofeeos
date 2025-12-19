import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersGateway } from './orders.gateway';
import { PrismaService } from '../prisma.service';

@Module({
    controllers: [OrdersController],
    providers: [OrdersService, OrdersGateway, PrismaService],
    exports: [OrdersGateway],
})
export class OrdersModule { }
