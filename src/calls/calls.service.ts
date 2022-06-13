import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
import { Call } from './model/call.model';

@UseGuards(AuthGuard('jwt'))
@Injectable()
export class CallsService {
  constructor(
    @InjectModel('Call') private readonly callModel: Model<Call>,
  ) {}
  create(createCallDto: CreateCallDto) {
    return this.callModel.create(createCallDto);
  }

  findAll() {
    return this.callModel.find();
  }

  findOne(id: number) {
    return this.callModel.findById(id);
  }

  update(id: number, updateCallDto: UpdateCallDto) {
    return this.callModel.findByIdAndUpdate(id, updateCallDto);
  }

  remove(id: number) {
    return this.callModel.findByIdAndRemove(id);
  }
}
