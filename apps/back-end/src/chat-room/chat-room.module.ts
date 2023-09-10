import { Module } from '@nestjs/common';
import { ChatRoomGateway } from './chat-room.gateway';
import { ChatRoomService } from './chat-room.service';
import { DatabaseModule } from 'src/database/database.module';
import { ChatRoomProviders } from './database/chat-room.providers';

@Module({
  imports: [DatabaseModule],
  providers: [ChatRoomGateway, ChatRoomService, ...ChatRoomProviders],
})
export class ChatRoomModule {}
