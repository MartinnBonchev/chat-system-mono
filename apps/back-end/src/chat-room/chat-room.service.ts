import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChatRoom } from './entities/chat-room.entity';
import { Message } from './entities/message.entity';
import { User } from 'src/identity/entities/identity.entity';
import { UserChatRole } from './entities/chat-room-role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private ChatRoomRepo: Repository<ChatRoom>,
    @InjectRepository(Message)
    private MessageRepo: Repository<Message>,
    @InjectRepository(User)
    private UserRepo: Repository<User>,
    @InjectRepository(UserChatRole)
    private UserChatRoleRepo: Repository<UserChatRole>,
  ) {}

  async createChatRoom(roomCreatorId: number, roomName: string) {
    const room = this.ChatRoomRepo.create();
    const role = this.UserChatRoleRepo.create();
    const creator = await this.UserRepo.findOne({
      where: { id: roomCreatorId },
    });

    role.role = 'admin';
    role.user = creator;
    await this.UserChatRoleRepo.save(role);

    room.name = roomName;
    room.messages = [];
    room.users = [creator];

    return this.ChatRoomRepo.save(room);
  }
  async addToRoom() {}
  async removeFromRoom() {}
  async getChatRoom(id: number) {
    try {
      return this.ChatRoomRepo.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Chat room with id: ${id} does not exist`);
    }
  }
  //   async sendMessage(chatId: number, senderId: number) {}
  //   async getMessages(chatId: number) {}
}
