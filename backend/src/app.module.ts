import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { AffiliateModule } from './affiliate/affiliate.module';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { SuperAdminModule } from './super-admin/super-admin.module';
import { ShopsModule } from './shops/shops.module';
import { ShiftsModule } from './shifts/shifts.module';
import { DiscountsModule } from './discounts/discounts.module';
import { ReportsModule } from './reports/reports.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    MenuModule,
    OrdersModule,
    AuthModule,
    AffiliateModule,
    LoyaltyModule,
    SuperAdminModule,
    ShopsModule,
    ShiftsModule,
    DiscountsModule,
    ReportsModule,
    AuditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

