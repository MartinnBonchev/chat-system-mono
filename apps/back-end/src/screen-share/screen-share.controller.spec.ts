import { Test, TestingModule } from '@nestjs/testing';
import { ScreenShareController } from './screen-share.controller';

describe('ScreenShareController', () => {
  let controller: ScreenShareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScreenShareController],
    }).compile();

    controller = module.get<ScreenShareController>(ScreenShareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
