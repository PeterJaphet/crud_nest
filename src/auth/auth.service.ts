import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { loginUser } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUserDto: loginUser) {
    const { username } = loginUserDto;

    const user = await this.usersService.findOne({ username });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (!(await bcrypt.compare(loginUserDto.password, user.password))) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const { password, ...userDetail } = user;

    const jwt = await this.jwtService.signAsync({
      id: userDetail.id,
      username: userDetail.username,
      role: userDetail.role,
    });
    return { ...userDetail, token: jwt };
  }
}
