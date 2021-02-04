import { Injectable, HttpException } from '@nestjs/common';
import { TodoDTO } from '../../dto/todo.dto';
// import { TODOS } from './app.todos';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ITodos} from '../../interfaces/todo.interface';  


@Injectable()
export class TodoService {

  constructor(@InjectModel('todoSchema') private readonly todos: Model<ITodos>){}

  public getHello() {
    return 'Hello World!';
  }


  public async getTodos() :Promise<TodoDTO[]>{
    const todolist =await this.todos.find().exec();
    if(!todolist)
      throw new HttpException('Not Found',404);
    return todolist;
  }

  public async createTodo(todo){
      const newtodo = await new this.todos(todo);
      return newtodo.save();
  }

  public async getTodoById(id: string): Promise<TodoDTO>{
    const todo = await this.todos.findById(id).exec();
    if(!todo)
      throw new HttpException('Not Found',404);
    return todo;
  }

  public async modifyTodoById(id: string,newtodo: TodoDTO) :Promise<TodoDTO>{
    
    const todo = await this.todos.findByIdAndUpdate(id,newtodo).exec();
    if(!todo)
      throw new HttpException('Not Found',404);
    return todo;
  }

  public async deleteTodoById(id:string) : Promise<TodoDTO>{
    const todo = await this.todos.findByIdAndDelete(id).exec();
    if(!todo)
      new HttpException('Not Found',404);
    return todo;
  }
}
