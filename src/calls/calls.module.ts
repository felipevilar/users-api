import { CallSchema } from './model/call.model';
import { Module } from '@nestjs/common';
import { CallsService } from './calls.service';
import { CallsController } from './calls.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Call',
        schema: CallSchema,
      },
    ]),
  ],
  controllers: [CallsController],
  providers: [CallsService]
})
export class CallsModule {}
