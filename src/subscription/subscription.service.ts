// subscription.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    const subscription = this.subscriptionRepository.create(createSubscriptionDto);
    return this.subscriptionRepository.save(subscription);
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionRepository.find();
  }

  async findOne(id: number): Promise<Subscription> {
    return this.subscriptionRepository.findOne({ where: { subscription_id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.subscriptionRepository.delete(id);
  }
}
