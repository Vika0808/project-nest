import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('Subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  subscription_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'subscribed_to_user_id' })
  subscribedToUser: User;
}
