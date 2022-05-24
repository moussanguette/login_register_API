import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    readonly nom : string

    @IsNotEmpty()
    readonly prenom : string

    @IsNotEmpty()
    @IsEmail()
    readonly email : string;

    @IsNotEmpty()
    readonly username : string

    @IsNotEmpty()
    readonly password : string
    
    @IsNotEmpty()
    readonly age : number
}
