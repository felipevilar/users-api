import { AuthService } from './../auth/auth.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/user.model';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  signUp(signUp: CreateUserDto) {
    const user = new this.userModel(signUp);
    return user.save();
  }

  async signIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.findByEmail(email);
    await this.comparePassword(password, user.password);

    const accessToken = await this.authService.createAccessToken(user.id);

    return {
      name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      token: accessToken,
    };
  }

  private async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if(!user) throw new UnauthorizedException()
    return user
  }

  private async comparePassword(password: string, hash: string) {
    const match = await bcrypt.compare(password, hash);
    if(!match) throw new UnauthorizedException();
    return match;
  }

  findAll() {
    return this.userModel.find()
  }

  findOne(id: number) {
    return this.userModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: number) {
    return this.userModel.findByIdAndRemove(id);
  }
}
