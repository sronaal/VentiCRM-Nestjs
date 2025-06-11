import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }



  @Post('/login')
  login(@Body() loginDto: LoginDTO) {
    return this.authService.logIn(loginDto)
  }

  @Get('/me/:id')
  userAuth(@Param(':id') id: string ){
    return this.authService.UserAuth(id)
  }
  

}
