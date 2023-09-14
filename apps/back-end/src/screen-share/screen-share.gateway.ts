import { InjectRepository } from '@nestjs/typeorm';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatRoom } from 'src/chat-room/entities/chat-room.entity';
import { Repository } from 'typeorm';

@WebSocketGateway()
export class ScreenShareGateway {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepo: Repository<ChatRoom>,
  ) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('screen_share')
  async startSession(
    client: Socket,
    { roomId, stream }: { roomId: string; stream: unknown },
  ): Promise<void> {
    const chatRoom = await this.chatRoomRepo.findOneOrFail({
      where: { id: roomId },
    });

    if (chatRoom.hasActiveScreenShare) {
      this.server.to(roomId).emit('screen_stream', stream);
    }
  }
}
