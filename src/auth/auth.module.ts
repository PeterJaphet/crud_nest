import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { jwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtSecret } from 'src/utils/constant';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, jwtStrategy],
})
export class AuthModule {}
