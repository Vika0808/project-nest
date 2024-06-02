// subscription.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('Subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  subscription_id: number;

  @Column()
  topic: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
