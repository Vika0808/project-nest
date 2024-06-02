import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException } from '@nestjs/common';
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
    const id = parseInt(post_id, 10);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid post ID');
    }
    return this.postService.findOne(id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Put(':id')
  update(@Param('id') post_id: string, @Body() updatePostDto: UpdatePostDto) {
    const id = parseInt(post_id, 10);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid post ID');
    }
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') post_id: string) {
    const id = parseInt(post_id, 10);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid post ID');
    }
    return this.postService.remove(id);
  }

  @Post(':id/like')
  addLike(@Param('id') post_id: string) {
    const id = parseInt(post_id, 10);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid post ID');
    }
    return this.postService.addLike(id);
  }
}
