import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';

@Entity('Comments')
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column()
  content: string;

  @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' }) // Додаємо onDelete: 'CASCADE' для постів
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' }) // Додаємо onDelete: 'CASCADE' для користувачів
  @JoinColumn({ name: 'user_id' })
  user: User;
}
