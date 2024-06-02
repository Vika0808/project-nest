import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentController } from "./comment/comment.controller";
import { CommentService } from "./comment/comment.service";
import { Comment } from './comment/comment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Comment])], 
    providers: [CommentService],
    controllers: [CommentController],
  })
  export class CommentModule {}