import { Module } from '@nestjs/common';
import { ChatRoomGateway } from './chat-room.gateway';
import { ChatRoomService } from './chat-room.service';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './database/chat-room.entity';
import { Message } from './database/message.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([ChatRoom, Message])],
  providers: [ChatRoomGateway, ChatRoomService],
})
export class ChatRoomModule {}
