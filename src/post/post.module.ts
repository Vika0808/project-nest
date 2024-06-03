import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Comment } from '../comment/comment.entity'; 
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Post, Comment]),
    JwtModule.register({
    secret: 'secretKey', 
    signOptions: { expiresIn: '1h' },
  }),
], 
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
