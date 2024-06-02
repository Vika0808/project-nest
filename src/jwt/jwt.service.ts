// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { JwtModule } from '@nestjs/jwt'; // Додано імпорт JwtModule
// import { Post } from '../post/post.entity';
// import { Comment } from '../comment/comment.entity'; 
// import { PostService } from '../post/post.service';
// import { PostController } from '../post/post.controller';
// import { JwtAuthGuard } from '../jwt/jwt-auth.guard'; // Додано імпорт JwtAuthGuard

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Post, Comment]),
//     JwtModule.register({}), // Додано реєстрацію JwtModule
//   ],
//   providers: [PostService, JwtAuthGuard], // Додано JwtAuthGuard до providers
//   controllers: [PostController],
// })
// export class PostModule {}
