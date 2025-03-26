import { Injectable } from '@nestjs/common';
import { CreateHexaDto } from './dto/create-hexa.dto';
import { UpdateHexaDto } from './dto/update-hexa.dto';

@Injectable()
export class HexaService {
  create(createHexaDto: CreateHexaDto) {
    return 'This action adds a new hexa';
  }

  findAll() {
    return `This action returns all hexa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hexa`;
  }

  update(id: number, updateHexaDto: UpdateHexaDto) {
    return `This action updates a #${id} hexa`;
  }

  remove(id: number) {
    return `This action removes a #${id} hexa`;
  }
}
