import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './model/client.model';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<Client>,
  ) {}

  create(createClientDto: CreateClientDto) {
    return this.clientModel.create(createClientDto);
  }

  findAll() {
    return this.clientModel.find();
  }

  findOne(id: number) {
    return this.clientModel.findById(id);
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientModel.findByIdAndUpdate(id, updateClientDto);
  }

  remove(id: number) {
    return this.clientModel.findByIdAndRemove(id);
  }
}
