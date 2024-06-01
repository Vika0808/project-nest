// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request, Response, NextFunction } from 'express';
// import { UserService } from './user/user.service';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   constructor(private jwtService: JwtService, private userService: UserService) {}

//   async use(req: Request, res: Response, next: NextFunction) {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//       const token = authHeader.split(' ')[1];
//       const payload = this.jwtService.verify(token);
//       const user = await this.userService.findByUsername(payload.username);
//       req.user = user;
//     }
//     next();
//   }
// }
