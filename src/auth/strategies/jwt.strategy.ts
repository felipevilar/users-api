import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/users/model/user.model';

export type JwtPayload = {
  userId: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService, 
  ) {
    super({
      jwtFromRequest: authService.getJwtToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(jwtPayload: JwtPayload): Promise<User> {
    const user = await this.authService.validateUser(jwtPayload);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}