import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HexaService } from './hexa.service';
import { CreateHexaDto } from './dto/create-hexa.dto';
import { UpdateHexaDto } from './dto/update-hexa.dto';

@Controller()
export class HexaController {
  constructor(private readonly hexaService: HexaService) {}

  @MessagePattern('createHexa')
  create(@Payload() createHexaDto: CreateHexaDto) {
    return this.hexaService.create(createHexaDto);
  }

  @MessagePattern('findAllHexa')
  findAll() {
    return this.hexaService.findAll();
  }

  @MessagePattern('findOneHexa')
  findOne(@Payload() id: number) {
    return this.hexaService.findOne(id);
  }

  @MessagePattern('updateHexa')
  update(@Payload() updateHexaDto: UpdateHexaDto) {
    return this.hexaService.update(updateHexaDto.id, updateHexaDto);
  }

  @MessagePattern('removeHexa')
  remove(@Payload() id: number) {
    return this.hexaService.remove(id);
  }
}
