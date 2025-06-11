import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {

    @IsString()
    @IsNotEmpty({message: 'El nombre es obligatorio'})
    name: string
    
    @IsString()
    @IsEmail()
    @IsNotEmpty({message: 'El correo es obligatorio'})
    email: string

    @IsString()
    @IsNotEmpty({message: 'La contraseña es obligatoria'})
    password: string
}
