import { AuthModule } from './../auth/auth.module';
import { UserSchema } from './model/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      }
    ]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
