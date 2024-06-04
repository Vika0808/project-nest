import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt')) 
  @Get()
  async getCurrentUser(@Req() req) {
    return req.user; 
  }

  @Get('all') 
  async getUsers() {
    return this.userService.getUsers();
  }
}
