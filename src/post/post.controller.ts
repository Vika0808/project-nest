import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException, UseGuards, Request } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService, 
    private readonly userService: UserService
  ) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') post_id: string) {
    const id = parseInt(post_id, 10);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid post ID');
    }
    return this.postService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Request() req) {
    const user = await this.userService.findByUsername(req.user.username);
    return this.postService.create(createPostDto, user);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') post_id: string, @Body() updatePostDto: UpdatePostDto, @Request() req) {
    const id = parseInt(post_id, 10);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid post ID');
    }
    const user = await this.userService.findByUsername(req.user.username);
    return this.postService.update(id, updatePostDto, user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') post_id: string, @Request() req) {
    const id = parseInt(post_id, 10);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid post ID');
    }
    const user = await this.userService.findByUsername(req.user.username);
    return this.postService.remove(id, user);
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
