import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule} from '@nestjs/jwt';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { UserController } from "src/controllers/users/user.controller";
import { UserService } from "src/controllers/users/user.service";
import { userSchema } from "src/schemas/user.model";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "src/guards/jwt.strategy";
import { jwtConstants } from "./constants";
import { JwtAuthGuard } from "src/guards/authentication.guard";

@Module({
    imports:[
        PassportModule.register({ defaultStrategy: 'jwt' }),
        ConfigModule,
        JwtModule.registerAsync({
        imports: [
            ConfigModule,
        ],

        useFactory: async( configservice:ConfigService) =>{
            return {
            // secret: configservice.get('JWT_SECRET'),
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '600000'},
            }
        },
        inject:[ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'userSchema',schema : userSchema}])
    
    ],
    
    controllers: [UserController],
    providers: [UserService,ConfigService,JwtStrategy,JwtAuthGuard],
    exports:[UserService]
})

export class UserModule{}