import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { CreateProductParams, UpdateProductParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  findProducts() {
    return this.productRepository.find();
  }

  createProduct(productDetails: CreateProductParams) {
    const newProduct = this.productRepository.create({
      ...productDetails,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.productRepository.save(newProduct);
  }

  findProduct(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  updateProduct(id: number, updateProductDetails: UpdateProductParams) {
    return this.productRepository.update({ id }, { ...updateProductDetails });
  }

  deleteProduct(id: number) {
    return this.productRepository.delete({ id });
  }
}
