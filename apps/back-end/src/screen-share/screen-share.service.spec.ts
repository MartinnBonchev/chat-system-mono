import { Test, TestingModule } from '@nestjs/testing';
import { ScreenShareService } from './screen-share.service';

describe('ScreenShareService', () => {
  let service: ScreenShareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreenShareService],
    }).compile();

    service = module.get<ScreenShareService>(ScreenShareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
