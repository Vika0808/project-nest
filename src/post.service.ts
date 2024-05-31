import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './create-post.dto';
import { UpdatePostDto } from './update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(post_id: number): Promise<Post> {
    return this.postRepository.findOneBy({ post_id });
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async update(post_id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.postRepository.update(post_id, updatePostDto);
    return this.postRepository.findOneBy({ post_id });
  }

  async remove(post_id: number): Promise<void> {
    await this.postRepository.delete(post_id);
  }

  async addLike(post_id: number): Promise<void> {
    const post = await this.postRepository.findOneBy({ post_id });
    post.likes += 1;
    await this.postRepository.save(post);
  }
}
