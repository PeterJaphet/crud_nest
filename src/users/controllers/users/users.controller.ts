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
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/authentication.guard';
import { AdminGuard, UserGuard } from 'src/guards/authorization.guard';
import { CreateUserResponseType } from 'src/swagger/user.swagger';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('allUsers')
  @ApiOkResponse({
    status: 200,
    type: User,
  })
  @UseGuards(AuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('Authorization')
  async getUser() {
    const users = await this.userService.findUsers();
    return users;
  }

  @Post('signup')
  @ApiOkResponse({
    status: 200,
    type: CreateUserResponseType,
  })
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser({
      ...createUserDto,
    });
  }

  @Patch('update/:id')
  @ApiOkResponse({
    status: 200,
  })
  @UseGuards(AuthGuard, UserGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('Authorization')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete('delete/:id')
  @ApiOkResponse({
    status: 200,
  })
  @UseGuards(AuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('Authorization')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }
}
