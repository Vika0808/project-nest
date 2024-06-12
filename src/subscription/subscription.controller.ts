import { Controller, Get, Post, Delete, Param, UseGuards, Request, Body, BadRequestException, NotFoundException } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { UpdateSubscriptionDto } from '../dto/update-subscription.dto';
import { Subscription } from './subscription.entity';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly userService: UserService
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto, @Request() req): Promise<Subscription> {
    const user = await this.userService.findByUsername(req.user.username);
    if (!user) {
      throw new BadRequestException('User not authenticated');
    }
    
    return this.subscriptionService.create(createSubscriptionDto, user);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req): Promise<Subscription[]> {
    const user = req.user;
    if (!user) {
      throw new BadRequestException('User not authenticated');
    }
    return this.subscriptionService.findAllForUser(user.user_id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req): Promise<Subscription> {
    const user = req.user;
    if (!user) {
      throw new BadRequestException('User not authenticated');
    }
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
    if (!user) {
      throw new BadRequestException('User not authenticated');
    }
    const subscriptionId = parseInt(id, 10);
    if (isNaN(subscriptionId)) {
      throw new BadRequestException('Invalid subscription ID');
    }
    return this.subscriptionService.remove(subscriptionId, user.user_id);
  }

  @UseGuards(AuthGuard)
  @Post('check')
  async checkSubscription(@Body() body: any, @Request() req): Promise<{ isSubscribed: boolean }> {
    const user = req.user;
    if (!user) {
      throw new BadRequestException('User not authenticated');
    }
    const userId = body.user_id;
    const subscriptions = await this.subscriptionService.findAllForUser(user.user_id);
    const isSubscribed = subscriptions.some(subscription => subscription.subscribedToUser.user_id === userId);
    return { isSubscribed };
  }
}
