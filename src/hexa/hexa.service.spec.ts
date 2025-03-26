import { Test, TestingModule } from '@nestjs/testing';
import { HexaService } from './hexa.service';

describe('HexaService', () => {
  let service: HexaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HexaService],
    }).compile();

    service = module.get<HexaService>(HexaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
