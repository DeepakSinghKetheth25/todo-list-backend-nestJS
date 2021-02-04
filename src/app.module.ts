import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule} from '@nestjs/mongoose';
import { TodoModule } from './module/todo.module';
import { UserModule } from './module/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TodoModule,
    UserModule,
    MongooseModule.forRoot('mongodb+srv://root:root@cluster0.tthe7.mongodb.net/tododb')
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
