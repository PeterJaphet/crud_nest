import { IsString, IsNotEmpty } from 'class-validator';
import { Role } from 'src/enum/enum';

export class CreateUserDto {
  username: string;
  password: string;
  @IsString()
  @IsNotEmpty({
    message: 'Role is required',
  })
  role: Role;
}
