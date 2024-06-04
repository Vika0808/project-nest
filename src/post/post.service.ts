import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['user', 'comments'] });
  }

  async findOne(post_id: number): Promise<Post> {
    if (isNaN(post_id)) {
      throw new BadRequestException('Invalid post ID');
    }
    const post = await this.postsRepository.findOne({ where: { post_id }, relations: ['user', 'comments'] });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const post = this.postsRepository.create({ ...createPostDto, user });
    return this.postsRepository.save(post);
  }

  async update(post_id: number, updatePostDto: UpdatePostDto, user: User): Promise<Post> {
    if (isNaN(post_id)) {
      throw new BadRequestException('Invalid post ID');
    }
    const post = await this.findOne(post_id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.user.user_id !== user.user_id) {
      throw new BadRequestException('You can only edit your own posts');
    }
    Object.assign(post, updatePostDto);
    await this.postsRepository.save(post);
    return post;
  }

  async remove(post_id: number, user: User): Promise<void> {
    if (isNaN(post_id)) {
      throw new BadRequestException('Invalid post ID');
    }
    const post = await this.findOne(post_id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.user.user_id !== user.user_id) {
      throw new BadRequestException('You can only delete your own posts');
    }
    await this.postsRepository.remove(post);
  }

  async addLike(post_id: number): Promise<void> {
    if (isNaN(post_id)) {
      throw new BadRequestException('Invalid post ID');
    }
    const post = await this.findOne(post_id);
    post.likes += 1;
    await this.postsRepository.save(post);
  }
}
