import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/typeorm/entities/User';

export class LoginUserResponseType {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;
}

export class CreateUserResponseType {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;
}
