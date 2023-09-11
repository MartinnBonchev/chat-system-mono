import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ChatRoom } from './chat-room.entity';
import { User } from 'src/identity/entities/identity.entity';

@Entity()
export class UserChatRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user',
  })
  role: 'admin' | 'user';

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => ChatRoom, { eager: true })
  chatRoom: ChatRoom;

  constructor(role: UserChatRole) {
    Object.assign(this, role);
  }
}
