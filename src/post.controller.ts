import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './create-post.dto';
import { UpdatePostDto } from './update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') post_id: string) {
    return this.postService.findOne(+post_id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Put(':id')
  update(@Param('id') post_id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+post_id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') post_id: string) {
    return this.postService.remove(+post_id);
  }

  @Post(':id/like')
  addLike(@Param('id') post_id: string) {
    return this.postService.addLike(+post_id);
  }
}
