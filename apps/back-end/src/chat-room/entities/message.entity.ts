import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChatRoom } from './chat-room.entity';
import { User } from 'src/identity/entities/identity.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'timestamp', default: new Date() })
  created_at?: Date;

  @Column({ type: 'timestamp', default: new Date() })
  updated_at?: Date;

  @ManyToOne(() => ChatRoom)
  user: User;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages)
  chat_room: ChatRoom;

  constructor(message: Message) {
    Object.assign(this, message);
  }
}
