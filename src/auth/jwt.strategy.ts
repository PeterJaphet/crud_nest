import { Injectable } from '@nestjs/common/decorators/core';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'peter@1960',
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
    };
  }
}
