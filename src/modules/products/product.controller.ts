import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Post()
  async createProduct(@Body() body: { name: string; price: number }): Promise<Product> {
    return this.productService.createProduct(body.name, body.price);
  }
}
