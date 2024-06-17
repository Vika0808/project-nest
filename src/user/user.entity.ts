import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '../post/post.entity';

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

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}
