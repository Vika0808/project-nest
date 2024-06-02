import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt')) // Застосовуємо guard для захисту маршруту
  @Get()
  async getCurrentUser(@Req() req) {
    return req.user; // Повертаємо дані поточного користувача
  }

  @Get('all') // Маршрут для отримання всіх користувачів (необов'язково)
  async getUsers() {
    return this.userService.getUsers();
  }
}
