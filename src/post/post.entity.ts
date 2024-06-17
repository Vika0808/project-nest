import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';

@Entity('Posts')
export class Post {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' }) // Додаємо onDelete: 'CASCADE'
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, comment => comment.post, { cascade: true, onDelete: 'CASCADE' }) // Забезпечуємо каскадне видалення коментарів
  comments: Comment[];
}
