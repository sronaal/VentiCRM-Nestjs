import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRETJWT || 'SECRET',
      signOptions: { expiresIn: '60s'}
    })
  ],
  exports: [AuthGuard],

})
export class AuthModule { }
