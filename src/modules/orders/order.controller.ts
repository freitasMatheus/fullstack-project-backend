import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Post()
  async createOrder(@Body() body: { userId: number; total: number }): Promise<Order> {
    return this.orderService.createOrder(body.userId, body.total);
  }
}
