import { Controller, Get, Req, UseGuards, Param, Put, Body, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { RolesGuard } from '../guard/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCurrentUser(@Req() req) {
    const user = req.user;
    const detailedUser = await this.userService.findOne(user.user_id); // Fetch full user details
    console.log('Current User:', detailedUser);
    return detailedUser;
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('all')
  async getUsers() {
    const users = await this.userService.getUsers();
    console.log('All Users:', users);
    return users;
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id/role')
  async updateRole(@Param('id') id: number, @Body('role') role: string) {
    console.log(`Updating role for user ${id} to ${role}`);
    const updatedUser = await this.userService.updateRole(id, role);
    console.log('Updated User:', updatedUser);
    return updatedUser;
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    console.log(`Deleting user with id ${id}`);
    const user = await this.userService.findOne(id); // Fetch user data before deleting
    console.log('User to be deleted:', user);
    await this.userService.deleteUser(id);
    console.log(`User with id ${id} deleted successfully`);
    return { message: 'User deleted successfully' };
  }
}
