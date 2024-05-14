import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { UserService } from './user.service'; 

@Module({
  imports: [
    AuthModule,
  ],
  providers: [UserService], 
})
export class AppModule {}
