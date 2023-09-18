import { Test, TestingModule } from '@nestjs/testing';
import { ScreenShareGateway } from './screen-share.gateway';

describe('ScreenShareGateway', () => {
  let gateway: ScreenShareGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreenShareGateway],
    }).compile();

    gateway = module.get<ScreenShareGateway>(ScreenShareGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
