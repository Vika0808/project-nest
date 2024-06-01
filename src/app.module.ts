import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { Comment } from './comment.entity';
import { PostModule } from './post.module';
import { Post } from './post.entity';
import { CommentModule } from './comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'db',
      entities: [User, Post, Comment],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    PostModule,
    CommentModule
  ],
  providers: [], 
})
export class AppModule {}
