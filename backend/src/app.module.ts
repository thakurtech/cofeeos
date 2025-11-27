import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { AffiliateModule } from './affiliate/affiliate.module';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { SuperAdminModule } from './super-admin/super-admin.module';

@Module({
  imports: [MenuModule, OrdersModule, AuthModule, AffiliateModule, LoyaltyModule, SuperAdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
