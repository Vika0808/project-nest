import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly userService: UserService,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto, user: User): Promise<Subscription> {
    console.log(user);
    const subscribedToUser = await this.userService.findOne(createSubscriptionDto.subscribed_to_user_id);
    if (!subscribedToUser) {
      throw new NotFoundException('User to subscribe to not found');
      
    }
    console.log(subscribedToUser);
    const subscription = this.subscriptionRepository.create({
      user,
      subscribedToUser,
    });
    console.log(subscription);
    return this.subscriptionRepository.save(subscription);
  }

  async findAllForUser(userId: number): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      where: { user: { user_id: userId } },
      relations: ['user', 'subscribedToUser'],
    });
  }

  async findOneForUser(subscriptionId: number, userId: number): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { subscription_id: subscriptionId, user: { user_id: userId } },
      relations: ['user', 'subscribedToUser'],
    });
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }
    return subscription;
  }

  async remove(subscriptionId: number, userId: number): Promise<void> {
    const subscription = await this.findOneForUser(subscriptionId, userId);
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }
    await this.subscriptionRepository.remove(subscription);
  }
}
