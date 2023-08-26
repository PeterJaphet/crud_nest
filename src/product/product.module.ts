import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product/product.controller';
import { ProductService } from './services/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/constant';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User]),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, UsersService],
})
export class ProductModule {}
