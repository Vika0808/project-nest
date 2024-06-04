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
    const post = this.postsRepository.create({...createPostDto, user});
    return this.postsRepository.save(post);
  }

  async update(post_id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    if (isNaN(post_id)) {
      throw new BadRequestException('Invalid post ID');
    }
    await this.postsRepository.update(post_id, updatePostDto);
    return this.findOne(post_id);
  }

  async remove(post_id: number): Promise<void> {
    if (isNaN(post_id)) {
      throw new BadRequestException('Invalid post ID');
    }
    await this.postsRepository.delete(post_id);
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
