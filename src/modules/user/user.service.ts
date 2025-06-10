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


    let userFind = await this.userRepository.findOne({ where: { email: createUserDto.email } })

    if (userFind) { return new HttpException(`El usuario con el correo ${createUserDto.email} ya se encuentra registrado`, HttpStatus.CONFLICT) }


    let userCreate = this.userRepository.create({
      id: uuid(),
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password
    })

    this.userRepository.save(userCreate)
    .then((usuario) => {
      
      return new HttpException(`Usuario creado: ${usuario}`, HttpStatus.CREATED)
    })
    .catch((error) => {
      console.log(error)
      return new HttpException(`Ha ocurrido un error ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
    })



  }




  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
