import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserCredentials } from "src/dto/user.dto";
import { UserResponse } from "src/dto/userResponse.dto";
import { IUsers } from "../../interfaces/user.interface";
import {JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';
import { LoginResponse } from "src/dto/signup-response.dto";

const rounds =12;


@Injectable()
export class UserService{

    constructor(@InjectModel('userSchema') private readonly users: Model<IUsers>,private readonly jwtService: JwtService){}

    public async userHello():Promise<string>{
        return "Hello User";
    }
    
    public async signup(user): Promise<UserResponse>{

        const existinguser = await this.users.findOne({'username':user.username}).exec();
        if(existinguser)
            throw new HttpException("Username Already Exists",HttpStatus.BAD_REQUEST); 


        user.password = await bcrypt.hash(user.password,rounds) ;
        let newuser1 = new UserCredentials();
        newuser1.username = user.username;
        newuser1.password = user.password;
       
        const newuser = await new this.users(newuser1);
        return newuser.save();
    }

    public async login(user):Promise<LoginResponse>{
     
     const existinguser = await this.users.findOne({'username':user.username}).exec();
    
     if(!existinguser)
        throw new HttpException('User not Found',HttpStatus.NOT_FOUND);
     if(await bcrypt.compare(user.password,existinguser.password)){
         let returnedUser = new UserCredentials();
         returnedUser.username = user.username;
         returnedUser.password = existinguser.password;
        return {
            token:await this.jwtService.signAsync({returnedUser}),
            username: returnedUser.username,
            tokenExpiry : '600000',
        }; 
     }
     throw new HttpException('Login Unsuccessful',HttpStatus.UNAUTHORIZED);
    }

    
}