import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    
    if (user && pass === user.password) {  
      return user; 
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto.username, loginUserDto.password);
    
    if (!user) {
      console.log(`У вас помилка: невірні дані для входу для користувача ${loginUserDto.username}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log(`Ви успішно увійшли у свій акаунт, користувач ${user.username} з ID ${user.user_id}`);
    
    
    const payload = { username: user.username, sub: user.user_id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
