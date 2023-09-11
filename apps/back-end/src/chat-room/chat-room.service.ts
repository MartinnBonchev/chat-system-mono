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
    private chatRoomRepo: Repository<ChatRoom>,
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(UserChatRole)
    private userChatRoleRepo: Repository<UserChatRole>,
  ) {}

  async createChatRoom(roomCreatorId: string, roomName: string) {
    const creator = await this.userRepo.findOneOrFail({
      where: { id: roomCreatorId },
    });
    const room = this.chatRoomRepo.create({
      name: roomName,
      messages: [],
      users: [creator],
    });
    const role = this.userChatRoleRepo.create({
      role: 'admin',
      user: creator,
      chatRoom: room,
    });

    await this.userChatRoleRepo.save(role);

    return this.chatRoomRepo.save(room);
  }

  async addToRoom(
    roomId: string,
    userId: string,
    role: 'admin' | 'user' = 'user',
  ) {
    const room = await this.chatRoomRepo.findOneOrFail({
      where: { id: roomId },
    });
    const user = await this.userRepo.findOneOrFail({ where: { id: userId } });

    const userRole = this.userChatRoleRepo.create({
      chatRoom: room,
      role,
      user,
    });
    await this.userChatRoleRepo.save(userRole);

    room.users = [...room.users, user];

    return this.chatRoomRepo.save(room);
  }
  async removeFromRoom(roomId: string, userId: string) {
    const room = await this.chatRoomRepo.findOneOrFail({
      where: { id: roomId },
    });
    const user = await this.userRepo.findOneOrFail({ where: { id: userId } });

    const userRole = await this.userChatRoleRepo.findOneOrFail({
      where: {
        chatRoom: room,
        user: user,
      },
    });

    const userIndex = room.users.findIndex(({ id }) => id === user.id);
    room.users = room.users.splice(userIndex, 1);

    await this.userChatRoleRepo.delete(userRole);
    return this.chatRoomRepo.save(room);
  }
  async getChatRoom(id: string) {
    try {
      return this.chatRoomRepo.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Chat room with id: ${id} does not exist`);
    }
  }

  async getAllRooms(userId: string) {
    const user = await this.userRepo.findOneOrFail({ where: { id: userId } });
    return this.chatRoomRepo.find({ where: { users: [user] } });
  }
  async sendMessage(chatId: string, senderId: string, messageFromUser: string) {
    const room = await this.chatRoomRepo.findOneOrFail({
      where: { id: chatId },
    });
    const user = await this.chatRoomRepo.findOneOrFail({
      where: { id: senderId },
    });

    const message = this.messageRepo.create({
      chat_room: room,
      user: user,
      message: messageFromUser,
    });

    room.messages = [...room.messages, message];

    await this.messageRepo.save(message);

    return this.chatRoomRepo.save(room);
  }
}
