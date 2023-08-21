import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  ParseIntPipe,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gaurd';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser() {
    const users = await this.userService.findUsers();
    return users;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashPassword = await bcrypt.hash(password, 12);
    return this.userService.createUser({
      ...createUserDto,
      password: hashPassword,
    });
  }

  // @Post('login')
  // async loginUser(@Body() loginUserDto: LoginUserDto) {
  //   const { username } = loginUserDto;
  //   const user = await this.userService.findOne({ username });

  //   if (!user) {
  //     throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  //   }

  //   if (!(await bcrypt.compare(loginUserDto.password, user.password)))
  //     throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  //   const { password, ...userDetail } = user;

  //   const jwt = await this.jwtService.signAsync({ id: userDetail.id });
  //   return { ...userDetail, token: jwt };
  // }

  @Patch(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }
}
