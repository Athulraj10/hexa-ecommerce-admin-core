import { Test, TestingModule } from '@nestjs/testing';
import { HexaController } from './hexa.controller';
import { HexaService } from './hexa.service';

describe('HexaController', () => {
  let controller: HexaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HexaController],
      providers: [HexaService],
    }).compile();

    controller = module.get<HexaController>(HexaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
