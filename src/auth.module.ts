
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
