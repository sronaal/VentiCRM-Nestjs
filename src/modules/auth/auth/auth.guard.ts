import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private readonly jwtService: JwtService){}

  

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenHeader(request);

    if (!token) {
      throw new UnauthorizedException('El token es requerido');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'SECRET',
      });
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('El token es invalido');
    }

    return true;
  }

  private extractTokenHeader(request: Request){
    const [type, token] = request.headers.authorization?.split(" ") ?? []

    return type === "Bearer" ? token : undefined;
  }
}
