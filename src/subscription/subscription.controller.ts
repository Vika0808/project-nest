// subscription.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { Subscription } from './subscription.entity';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @Get()
  findAll(): Promise<Subscription[]> {
    return this.subscriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Subscription> {
    return this.subscriptionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.subscriptionService.remove(+id);
  }
}
