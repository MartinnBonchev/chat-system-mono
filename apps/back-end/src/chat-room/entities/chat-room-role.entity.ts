import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ChatRoom } from './chat-room.entity';
import { User } from 'src/identity/entities/identity.entity';

@Entity()
export class UserChatRole {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user',
  })
  role: 'admin' | 'user';

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => ChatRoom)
  chatRoom: ChatRoom;

  constructor(role: UserChatRole) {
    Object.assign(this, role);
  }
}
