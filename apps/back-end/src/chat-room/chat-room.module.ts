import { Module } from '@nestjs/common';
import { ChatRoomGateway } from './chat-room.gateway';
import { ChatRoomService } from './chat-room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './entities/chat-room.entity';
import { Message } from './entities/message.entity';
import { UserChatRole } from './entities/chat-room-role.entity';
import { IdentityModule } from 'src/identity/identity.module';
import { ChatRoomController } from './chat-room.controller';

@Module({
  imports: [
    IdentityModule,
    TypeOrmModule.forFeature([ChatRoom, Message, UserChatRole]),
    IdentityModule,
  ],
  providers: [ChatRoomGateway, ChatRoomService],
  controllers: [ChatRoomController],
})
export class ChatRoomModule {}
