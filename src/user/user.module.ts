import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RolesGuard } from '../guard/roles.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    exports: [UserService],
    providers: [
        UserService,
        RolesGuard,
    ],
    controllers: [UserController]
})
export class UserModule {}
