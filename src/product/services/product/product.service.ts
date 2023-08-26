import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { User } from 'src/typeorm/entities/User';
import { CreateProductParams, UpdateProductParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findProducts() {
    return this.productRepository.find();
  }

  async createProduct(id: number, productDetails: CreateProductParams) {
    const user = await this.userRepository.findOneBy({ id });
    const newProduct = this.productRepository.create({
      ...productDetails,
      user,
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
