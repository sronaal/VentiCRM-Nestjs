import { IsEmail, IsNotEmpty, IsString, Max, Min } from "class-validator"


export class LoginDTO{

    @IsString({message:"Ingrese un cadena de texto"})
    @IsEmail({}, {message: "Ingrese un correo valido"})
    @IsNotEmpty({message: "El correo es obligatorio"})
    email: string

   
    @IsNotEmpty({message: 'La contraseña es obligatoria'})
    password: string
}