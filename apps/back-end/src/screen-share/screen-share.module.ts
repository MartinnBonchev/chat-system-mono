import { Module } from '@nestjs/common';
import { ScreenShareGateway } from './screen-share.gateway';
import { ScreenShareService } from './screen-share.service';
import { ChatRoomModule } from 'src/chat-room/chat-room.module';
import { ScreenShareController } from './screen-share.controller';

@Module({
  imports: [ChatRoomModule],
  providers: [ScreenShareGateway, ScreenShareService],
  controllers: [ScreenShareController],
})
export class ScreenShareModule {}
