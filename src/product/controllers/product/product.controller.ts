import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from 'src/product/dtos/CreateProduct.dto';
import { UpdateProductDto } from 'src/product/dtos/UpdateProduct.dto';
import { ProductService } from 'src/product/services/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    return await this.productService.findProducts();
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findProduct(id);
  }

  @Patch(':id')
  async updateProductById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async deleteProductById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.deleteProduct(id);
  }
}
