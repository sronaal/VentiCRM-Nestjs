import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login-dto';
import { AuthGuard } from './auth/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }



  @Post('/login')
  login(@Body() loginDto: LoginDTO) {
    return this.authService.logIn(loginDto)
  }

  @Get('/me/:id')
  @UseGuards(AuthGuard)
  userAuth(@Param(':id') id: string ){
    return this.authService.UserAuth(id)
  }
  

}
