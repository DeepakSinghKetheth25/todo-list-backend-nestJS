import { Module } from '@nestjs/common';
import { TodoController } from '../controllers/todos/todo.controller';
import { TodoService } from '../controllers/todos/todo.service';
import { MongooseModule} from '@nestjs/mongoose';
import { todoSchema} from '../schemas/todo.model';
import { JwtStrategy } from 'src/guards/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'todoSchema',schema : todoSchema}])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
