import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from 'src/types';
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.RT_SECRET,
      passReqToCallback: true,
    });
  }
  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.headers['authorization']
      .replace('Bearer', '')
      .trim();
    return {
      ...payload,
      refreshToken,
    };
  }
}
