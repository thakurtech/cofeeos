import { IsString, IsOptional, IsArray, ValidateNested, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
    @IsString()
    shopId: string;

    @IsString()
    @IsOptional()
    customerId?: string;

    @IsOptional()
    source?: 'POS' | 'QR_TABLE' | 'QR_PICKUP' | 'DELIVERY' | 'MINI_APP';

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @IsOptional()
    paymentMethod?: 'CASH' | 'UPI' | 'CARD' | 'SPLIT';

    @IsString()
    @IsOptional()
    discountCode?: string;

    @IsString()
    @IsOptional()
    notes?: string;

    @IsString()
    @IsOptional()
    tableNumber?: string;
}

export class OrderItemDto {
    @IsString()
    menuItemId: string;

    @IsNumber()
    quantity: number;

    @IsArray()
    @IsOptional()
    modifiers?: string[]; // array of modifier option IDs
}
