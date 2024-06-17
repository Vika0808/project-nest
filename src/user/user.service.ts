import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.date = createUserDto.dateOfBirth;
    user.role = createUserDto.role || 'user'; 
    return this.usersRepository.save(user);
  }

  
  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findOne(userId: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { user_id: userId } });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async updateRole(userId: number, role: string): Promise<User> {
    const user = await this.findOne(userId);
    if (user) {
      user.role = role;
      return this.usersRepository.save(user);
    }
    throw new Error('User not found');
  }
  
  async deleteUser(userId: number): Promise<void> {
    await this.usersRepository.delete(userId);
  }
}
