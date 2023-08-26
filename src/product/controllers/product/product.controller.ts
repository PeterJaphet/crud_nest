import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '../../../guards/authentication.guard';
import {
  AdminGuard,
  ManagerGuard,
  UserGuard,
} from 'src/guards/authorization.guard';
import { CreateProductDto } from 'src/product/dtos/CreateProduct.dto';
import { UpdateProductDto } from 'src/product/dtos/UpdateProduct.dto';
import { ProductService } from 'src/product/services/product/product.service';
import { CustomRequest } from 'src/interface/request.interface';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger/dist';
import { Product } from 'src/typeorm/entities/Product';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('allProducts')
  @ApiOkResponse({
    status: 200,
    type: Product,
  })
  @UseGuards(AuthGuard, AdminGuard || ManagerGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('Authorization')
  async getProducts() {
    return await this.productService.findProducts();
  }

  @Post('add')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    status: 200,
    type: Product,
  })
  @UseGuards(AuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('Authorization')
  async createProduct(
    @Req() req: CustomRequest,
    @Body() createProductDto: CreateProductDto,
  ) {
    const user = req.user;
    return this.productService.createProduct(user.id, createProductDto);
  }

  @Get('get/:id')
  @ApiOkResponse({
    status: 200,
    type: Product,
  })
  @UseGuards(AuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('Authorization')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findProduct(id);
  }

  @Patch('update/:id')
  @ApiOkResponse({
    status: 200,
    type: Product,
  })
  @UseGuards(AuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('Authorization')
  async updateProductById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.updateProduct(id, updateProductDto);
  }

  @Delete('delete/:id')
  @ApiOkResponse({
    status: 200,
  })
  @UseGuards(AuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('Authorization')
  async deleteProductById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.deleteProduct(id);
  }
}
