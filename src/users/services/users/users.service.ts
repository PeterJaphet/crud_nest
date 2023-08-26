import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserParams } from 'src/utils/types';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { Product } from 'src/typeorm/entities/Product';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SALT } from 'src/utils/constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private jwtService: JwtService,
  ) {}

  findUsers() {
    return this.userRepository.find();
  }

  findOne({ username }) {
    return this.userRepository.findOneBy({ username });
  }

  async createUser(userDetails: CreateUserDto) {
    if (userDetails.password !== userDetails.confirmPassword) {
      throw new HttpException('passswords must match', HttpStatus.BAD_REQUEST);
    }

    const findUser = await this.userRepository.findOne({
      where: [{ username: userDetails.username }],
    });

    console.log(findUser);

    if (findUser) {
      throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDetails.password, SALT);

    const newUser = this.userRepository.create({
      ...userDetails,
      password: hashPassword,
    });
    const { password, ...user } = await this.userRepository.save(newUser);

    const jwt = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
      role: user.role,
    });
    return { user, token: jwt };
  }

  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
}
