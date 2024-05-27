import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor (private userService: UserService){
        
    }

    @Post()
  async getUsers () {
    return this.userService.getUsers();
  }
}
