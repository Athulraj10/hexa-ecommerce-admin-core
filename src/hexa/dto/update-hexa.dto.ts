import { PartialType } from '@nestjs/mapped-types';
import { CreateHexaDto } from './create-hexa.dto';

export class UpdateHexaDto extends PartialType(CreateHexaDto) {
  id: number;
}
