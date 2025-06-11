import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }



  async logIn(loginDTO: LoginDTO) {

    try {

      const userFind = await this.userRepository.findOne({ where: { email: loginDTO.email } })

      if (!userFind) { throw new UnauthorizedException('Correo y/o contrañasa invalidos') }

      const isMatchPassword = bcrypt.compare(loginDTO.password, userFind.password)

      if (!isMatchPassword) { throw new UnauthorizedException('Correo y/o contraseña invalidos') }

      const user = { id: userFind.id, email: userFind.email, rol: userFind.role }

      const token = await this.jwtService.signAsync(user)

      return { token }
    } catch (error) {

      throw error
    }
  }

  async UserAuth(id: string) {
    
    try {
      const userFind = await this.userRepository.findOne({ where: { id }})

      if (!userFind) { throw new HttpException(`Usuario con id ${id} no encontrado`, HttpStatus.NOT_FOUND) }

      return  { id: userFind.id, email: userFind.email, rol: userFind.role }


      
    } catch (error) {
      throw error
    }


  }


}
