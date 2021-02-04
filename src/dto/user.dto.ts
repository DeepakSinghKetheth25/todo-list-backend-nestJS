import { IsEmail, IsNotEmpty, IsString } from "class-validator";
 

export class UserCredentials{

    @IsEmail()
    username: string;

    @IsNotEmpty()
    password: string;
}