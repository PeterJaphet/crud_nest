import {
  Body,
  Controller,
  Post,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { LoginUserDto } from './LoginUser.dto';
import { LocalAuthGuard } from './local-auth.gaurd';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      const userWithToken = await this.authService.validateUser(loginUserDto);
      return userWithToken;
    } catch (error) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
