import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatRoomService } from './chat-room.service';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatRoomGateway {
  constructor(private chatRoomService: ChatRoomService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    client: Socket,
    {
      chatId,
      senderId,
      message,
    }: {
      chatId: string;
      senderId: string;
      message: string;
    },
  ): Promise<void> {
    const messageEntity = await this.chatRoomService.sendMessage(
      chatId,
      senderId,
      message,
    );

    this.server.to(chatId).emit(
      'message',
      JSON.stringify({
        message: messageEntity.message,
        senderEmail: messageEntity.user.email,
        chatRoomName: messageEntity.chat_room.name,
      }),
    );
  }
}
