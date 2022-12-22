import { IsEmail, MinLength, IsString } from 'class-validator';


export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    @MinLength(5)
    password: string;

}