import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';
import { Subscription } from '../subscription/subscription.entity';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ default: 'user' }) 
  role: string;

  @OneToMany(() => Post, post => post.user, { cascade: true, onDelete: 'CASCADE' })
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.user, { cascade: true, onDelete: 'CASCADE' })
  comments: Comment[];

  @OneToMany(() => Subscription, subscription => subscription.user, { cascade: true, onDelete: 'CASCADE' })
  subscriptions: Subscription[];

  @OneToMany(() => Subscription, subscription => subscription.subscribedToUser, { cascade: true, onDelete: 'CASCADE' })
  subscribedToUsers: Subscription[];
}
