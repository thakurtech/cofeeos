import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { AffiliateModule } from './affiliate/affiliate.module';

@Module({
  imports: [MenuModule, OrdersModule, AuthModule, AffiliateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
