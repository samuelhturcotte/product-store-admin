import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ok } from '../../utils/httpUtils';
import { ProductsService } from './products.service';
import { Product } from './types';

@Controller({
  path: 'products',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async listProducts() {
    return ok(this.productsService.listProducts());
  }

  @Get(':id')
  async listProduct(@Param('id') id: number) {
    const product = this.productsService.listProduct(id);
    if (!product) {
      return ok({});
    }
    return ok(product);
  }

  @Post()
  async addProducts(@Body() body: Product[]) {
    if (!body && !body.length) {
      throw new Error('EMPTY_BODY');
    }
    return ok(await this.productsService.upsertProducts(body));
  }

  @Delete()
  async deleteProducts(@Body() body: number[]) {
    const deleteSuccess = await this.productsService.deleteProducts(body);
    if (!deleteSuccess) {
      throw new Error('PRODUCT_NOT_FOUND');
    }
    return;
  }
}
