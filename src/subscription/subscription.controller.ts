import { Controller, Get, Post, Delete, Param, UseGuards, Request, Body, BadRequestException } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { Subscription } from './subscription.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto, @Request() req): Promise<Subscription> {
    const user = req.user; 
    return this.subscriptionService.create(createSubscriptionDto, user);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req): Promise<Subscription[]> {
    const user = req.user;
    return this.subscriptionService.findAllForUser(user.user_id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req): Promise<Subscription> {
    const user = req.user;
    const subscriptionId = parseInt(id, 10);
    if (isNaN(subscriptionId)) {
      throw new BadRequestException('Invalid subscription ID');
    }
    return this.subscriptionService.findOneForUser(subscriptionId, user.user_id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req): Promise<void> {
    const user = req.user;
    const subscriptionId = parseInt(id, 10);
    if (isNaN(subscriptionId)) {
      throw new BadRequestException('Invalid subscription ID');
    }
    return this.subscriptionService.remove(subscriptionId, user.user_id);
  }
}
