import { Body, Controller, Get, Logger, Param, Post} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCredentials } from '../../dto/user.dto';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
// import { LoginGuard } from 'src/guards/login.guard';
import { Render } from '@nestjs/common/decorators/http/render.decorator';
import {LoggerService} from '@nestjs/common';
import { LoginResponse } from 'src/dto/signup-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}



    @Render('login')
    @Get('login')
    public index(){
        return;
    }

    @Post('login')
    public async login(@Body() user:UserCredentials):Promise<LoginResponse>{           
        return await this.userService.login(user);
    }


    @Post('signup')
    public async signup(@Body() user:UserCredentials){
        return this.userService.signup(user);
    } 

}
