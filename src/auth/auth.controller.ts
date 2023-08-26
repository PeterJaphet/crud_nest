import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { LoginUserDto } from './LoginUser.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { LoginUserResponseType } from 'src/swagger/user.swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({
    status: 200,
    type: LoginUserResponseType,
  })
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      const userWithToken = await this.authService.validateUser(loginUserDto);
      return userWithToken;
    } catch (error) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
