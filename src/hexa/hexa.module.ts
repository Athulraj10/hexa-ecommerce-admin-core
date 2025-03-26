import { Module } from '@nestjs/common';
import { HexaService } from './hexa.service';
import { HexaController } from './hexa.controller';

@Module({
  controllers: [HexaController],
  providers: [HexaService],
})
export class HexaModule {}
