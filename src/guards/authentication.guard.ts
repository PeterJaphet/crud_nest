import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users/users.service';
import { jwtSecret } from 'src/utils/constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let { authorization } = request.headers;

    if (!authorization) throw new UnauthorizedException('Provide JWT Token');
    else {
      try {
        authorization = authorization?.split(' ')[1];

        const decodedToken = this.jwtService.verify(authorization, {
          secret: jwtSecret,
        });

        console.log(decodedToken);

        const { username } = decodedToken;

        const user = this.usersService.findOne({ username });

        if (!user) {
          throw new UnauthorizedException('Account Not Found');
        }

        request.user = user;
        return true;
      } catch (error) {
        console.error(`AUTH_GUARD,ERROR = ${error}`);
        throw new UnauthorizedException('You Are Not Unauthorized');
      }
    }
  }
}
