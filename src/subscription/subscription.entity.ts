import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('Subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  subscription_id: number;

  @ManyToOne(() => User, user => user.subscriptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, user => user.subscribedToUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subscribed_to_user_id' })
  subscribedToUser: User;
}
