import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
//import { UserService } from './user.service'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'db',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
  ],
  providers: [], 
})
export class AppModule {}
