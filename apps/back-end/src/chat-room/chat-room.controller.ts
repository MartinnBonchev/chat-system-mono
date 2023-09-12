import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';

@Controller('chat-room')
export class ChatRoomController {
  constructor(
    @Inject(ChatRoomService)
    private chatRoomService: ChatRoomService,
  ) {}

  @Get()
  async getAllUserRooms(@Query('userId') userId: string) {
    return this.chatRoomService.getAllRooms(userId);
  }

  @Get(':id')
  async getRoom(@Param('id') id: string) {
    return this.chatRoomService.getChatRoom(id);
  }

  @Post()
  async createRoom(
    @Body('roomCreatorId') roomCreatorId: string,
    @Body('roomName') roomName: string,
  ) {
    return this.chatRoomService.createChatRoom(roomCreatorId, roomName);
  }

  @Patch('user/:id')
  async addToRoom(
    @Param('id') roomId: string,
    @Body('userEmail') userEmail: string,
    @Body('role') role: 'admin' | 'user' = 'user',
  ) {
    return this.chatRoomService.addToRoom(roomId, userEmail, role);
  }

  @Delete('user/:id')
  async removeFromRoom(
    @Param('id') roomId: string,
    @Body('userEmail') userEmail: string,
  ) {
    return this.removeFromRoom(roomId, userEmail);
  }
}
