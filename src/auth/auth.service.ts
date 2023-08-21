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

  //   async validateUser(loginUserDto: any) {
  //     const { username } = loginUserDto;
  //     const user = await this.usersService.findOne({ username });
  //     if (!user) {
  //       throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  //     }

  //     if (!(await bcrypt.compare(loginUserDto.password, user.password)))
  //       throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  //     const { password, ...userDetail } = user;

  //     const jwt = await this.jwtService.signAsync({ id: userDetail.id });
  //     return { ...userDetail, token: jwt };
  //   }

  async validateUser(loginUserDto: loginUser) {
    const { username } = loginUserDto;
    console.log(`Validating user: ${username}`);

    const user = await this.usersService.findOne({ username });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    console.log(
      `Comparing passwords: ${loginUserDto.password} with ${user.password}`,
    );
    if (!(await bcrypt.compare(loginUserDto.password, user.password))) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    console.log('Passwords match');

    const { password, ...userDetail } = user;

    const jwt = await this.jwtService.signAsync({ id: userDetail.id });
    return { ...userDetail, token: jwt };
  }
}
