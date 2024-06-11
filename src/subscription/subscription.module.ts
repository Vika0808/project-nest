import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity'; 
import { SubscriptionService } from './subscription.service'; 
import { SubscriptionController } from './subscription.controller'; 
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription ]),
    UserModule,
    JwtModule.register({
      secret: 'secretKey', 
      signOptions: { expiresIn: '1h' },
    })
  ], 
  controllers: [SubscriptionController], 
  providers: [SubscriptionService], 
})
export class SubscriptionModule {}
