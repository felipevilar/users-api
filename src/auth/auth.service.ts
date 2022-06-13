import { JwtPayload } from './strategies/jwt.strategy';
import {
  BadRequestException,
  Header,
  Inject,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User } from 'src/users/model/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  public async createAccessToken(userId: string): Promise<string> {
    const token = sign({ userId }, this.configService.get('JWT_SECRET'), {
      expiresIn: this.configService.get('JWT_EXPIRATION'),
    });
    return token
  }

  public async validateUser(jwtPayload: JwtPayload): Promise<User> {
    const { userId } = jwtPayload
    const user = await this.userModel.findById(userId);
    if (!user) throw new UnauthorizedException('User not found!');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  private jwtExtractor(@Req() req: Request) {
    const authorization = req.headers['authorization'];
    if(!authorization) throw new BadRequestException();
    const [type, token] = authorization.split(' ')
    if (type !== 'Bearer') throw new BadRequestException();
    return token;
  }

  public getJwtToken() {
    return this.jwtExtractor;
  }
}
