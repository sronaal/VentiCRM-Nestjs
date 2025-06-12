import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {


  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {


    try {

      let userFind = await this.userRepository.findOne({ where: { email: createUserDto.email } })

      if (userFind) { throw new HttpException(`El usuario con el correo ${createUserDto.email} ya se encuentra registrado`, HttpStatus.CONFLICT) }

      let userCreate = this.userRepository.create({
        id: uuid(),
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password
      })

      let user = await this.userRepository.save(userCreate)

      return user


    } catch (error) {

      throw error
    }


  }




  findAll() {
    return this.userRepository.find({ select: { id: true, name: true, email: true, role: true } })
  }

  async findOne(id: string) {

    try {
      const userFind = await this.userRepository.findOne({ where: { id } })

      if (!userFind) { throw new HttpException(`El usuario con el id ${id} no existe`, HttpStatus.NOT_FOUND) }

      return userFind

    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    try {

      await this.userRepository.update({id: id}, updateUserDto)
      return `Usuario actualizado correctamente`
    } catch (error) {
      throw new HttpException(`Error al actualizar usuario  ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  remove(id: string) {
    
    
  }
}
