// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthService } from '../auth/auth.service';
// import { AuthGuard } from '../auth/auth.guard';
// import { JwtStrategy } from './jwt.strategy';

// @Module({
//   imports: [
//     JwtModule.register({
//       secret: 'your-secret-key',
//       signOptions: { expiresIn: '60s' },
//     }),
//   ],
//   providers: [AuthService, AuthGuard, JwtStrategy],
//   exports: [AuthService, AuthGuard],
// })
// export class AuthModule {}
