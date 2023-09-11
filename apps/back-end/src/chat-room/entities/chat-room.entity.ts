import { User } from 'src/identity/entities/identity.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'timestamp', default: new Date() })
  created_at?: Date;

  @Column({ type: 'timestamp', default: new Date() })
  updated_at?: Date;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  users: User[];

  @OneToMany(() => Message, (message) => message.chat_room, { eager: true })
  messages: Message[];

  constructor(chatRoom: ChatRoom) {
    Object.assign(this, chatRoom);
  }
}
