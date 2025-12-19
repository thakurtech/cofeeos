import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
    MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
    cors: {
        origin: '*', // In production, restrict to your frontend domain
    },
    namespace: '/kitchen',
})
export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private logger = new Logger('OrdersGateway');

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    // Client joins a shop-specific room
    @SubscribeMessage('joinShop')
    handleJoinShop(
        @ConnectedSocket() client: Socket,
        @MessageBody() shopId: string,
    ) {
        client.join(`shop:${shopId}`);
        this.logger.log(`Client ${client.id} joined shop: ${shopId}`);
        return { success: true, message: `Joined shop ${shopId}` };
    }

    // Client leaves a shop room
    @SubscribeMessage('leaveShop')
    handleLeaveShop(
        @ConnectedSocket() client: Socket,
        @MessageBody() shopId: string,
    ) {
        client.leave(`shop:${shopId}`);
        this.logger.log(`Client ${client.id} left shop: ${shopId}`);
        return { success: true };
    }

    // Emit new order to kitchen displays for a specific shop
    emitNewOrder(shopId: string, order: any) {
        this.server.to(`shop:${shopId}`).emit('order:new', order);
        this.logger.log(`New order emitted to shop ${shopId}: ${order.shortId}`);
    }

    // Emit order status change
    emitOrderStatusChange(shopId: string, orderId: string, status: string, order: any) {
        this.server.to(`shop:${shopId}`).emit('order:statusChange', {
            orderId,
            status,
            order,
        });
        this.logger.log(`Order ${orderId} status changed to ${status}`);
    }

    // Emit order completed (remove from kitchen display)
    emitOrderCompleted(shopId: string, orderId: string) {
        this.server.to(`shop:${shopId}`).emit('order:completed', { orderId });
        this.logger.log(`Order ${orderId} completed`);
    }

    // Sound notification trigger
    emitSoundAlert(shopId: string, type: 'newOrder' | 'rush' = 'newOrder') {
        this.server.to(`shop:${shopId}`).emit('sound:alert', { type });
    }
}
