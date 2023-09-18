import { Controller, Delete, Inject, Param, Post } from '@nestjs/common';
import { ScreenShareService } from './screen-share.service';

@Controller('screen-share')
export class ScreenShareController {
  constructor(
    @Inject(ScreenShareService)
    private readonly screenShareService: ScreenShareService,
  ) {}

  @Post(':id')
  startSession(@Param('id') id: string) {
    return this.screenShareService.startScreenShareSession(id);
  }

  @Delete(':id')
  closeSession(@Param('id') id: string) {
    return this.screenShareService.closeScreenShareSession(id);
  }
}
