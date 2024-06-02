// import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';

// interface AuthenticatedRequest extends Request {
//   user?: any; // or a more specific type if you have one
// }

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
//     const authHeader = request.headers.authorization;

//     if (!authHeader) {
//       throw new UnauthorizedException('Authorization header is missing');
//     }

//     const parts = authHeader.split(' ');
//     if (parts.length !== 2 || parts[0] !== 'Bearer') {
//       throw new UnauthorizedException('Invalid authorization header format');
//     }

//     const token = parts[1];
//     try {
//       const payload = this.jwtService.verify(token);
//       if (typeof payload !== 'object' || !payload.userId) {
//         throw new UnauthorizedException('Invalid token payload');
//       }
//       request.user = payload;
//       return true;
//     } catch (e) {
//       throw new UnauthorizedException('Invalid or expired token');
//     }
//   }
// }
