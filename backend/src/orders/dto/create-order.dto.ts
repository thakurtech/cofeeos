export class CreateOrderDto {
    shopId: string;
    customerId?: string;
    source?: 'POS' | 'QR_TABLE' | 'QR_PICKUP' | 'DELIVERY' | 'MINI_APP';
    items: OrderItemDto[];
}

export class OrderItemDto {
    menuItemId: string;
    quantity: number;
    modifiers?: string[]; // array of modifier option IDs
}
