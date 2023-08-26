import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/enum/userEnum';
import { jwtSecret } from 'src/utils/constant';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly allowedRole: string,
    protected readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException('Provide JWT Token');
    } else {
      try {
        const token = authorization.split(' ')[1];
        const decode = this.jwtService.verify(token, {
          secret: jwtSecret,
        });
        if (decode.role !== this.allowedRole) {
          console.log('error', decode.role, this.allowedRole);
          throw new UnauthorizedException('Access Denied');
        }
        return true;
      } catch (error) {
        console.error(
          `${this.allowedRole}_AUTHORIZATION_GUARD, ERROR = ${error}`,
        );
        throw new UnauthorizedException('You Are Not authorized');
      }
    }
  }
}

@Injectable()
export class AdminGuard extends RoleGuard {
  constructor(protected readonly jwtService: JwtService) {
    super(Role.ADMIN, jwtService);
  }
}

@Injectable()
export class ManagerGuard extends RoleGuard {
  constructor(protected readonly jwtService: JwtService) {
    super(Role.MANAGER, jwtService);
  }
}

@Injectable()
export class UserGuard extends RoleGuard {
  constructor(protected readonly jwtService: JwtService) {
    super(Role.USER, jwtService);
  }
}
