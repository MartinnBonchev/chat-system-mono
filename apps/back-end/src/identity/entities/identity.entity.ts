import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password_hash: string;

  @Column({ type: 'timestamp', default: new Date() })
  created_at?: Date;

  @Column({ type: 'timestamp', default: new Date() })
  updated_at?: Date;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
