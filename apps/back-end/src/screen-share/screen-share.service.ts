import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from 'src/chat-room/entities/chat-room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScreenShareService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepo: Repository<ChatRoom>,
  ) {}

  async startScreenShareSession(roomId: string) {
    const room = await this.chatRoomRepo.findOneOrFail({
      where: { id: roomId },
    });

    if (room.hasActiveScreenShare) {
      return room;
    }

    room.hasActiveScreenShare = true;

    return this.chatRoomRepo.save(room);
  }
  async closeScreenShareSession(roomId: string) {
    const room = await this.chatRoomRepo.findOneOrFail({
      where: { id: roomId },
    });

    if (!room.hasActiveScreenShare) {
      return room;
    }

    room.hasActiveScreenShare = false;

    return this.chatRoomRepo.save(room);
  }
}
