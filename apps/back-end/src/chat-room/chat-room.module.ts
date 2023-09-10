import { Module } from '@nestjs/common';
import { ChatRoomGateway } from './chat-room.gateway';
import { ChatRoomService } from './chat-room.service';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './entities/chat-room.entity';
import { Message } from './entities/message.entity';
import { UserChatRole } from './entities/chat-room-role.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([ChatRoom, Message, UserChatRole]),
  ],
  providers: [ChatRoomGateway, ChatRoomService],
})
export class ChatRoomModule {}
