import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { UserService } from './user.service'; // Імпортуйте ваш сервіс

@Module({
  imports: [
    AuthModule,
  ],
  providers: [UserService], // Додайте ваш сервіс у провайдери
})
export class AppModule {}
