import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDTO } from '../../dto/todo.dto';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from 'src/guards/authentication.guard';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getTodos() {
    Logger.log("getTodos");
    return this.todoService.getTodos();
  }

  @Post()
  public async createTodo(@Body() todo:TodoDTO){
    Logger.log("addTodo");
    return this.todoService.createTodo(todo);
  }

  @Get(':id')
  public async getTodoById(@Param('id') id : string){
    Logger.log("getTodobyId");
    return this.todoService.getTodoById(id);
  }

  @Put(':id')
  public async modifyTodo(@Param('id') id:string,@Body() todo:TodoDTO){
    Logger.log("update");
        return this.todoService.modifyTodoById(id,todo);
  }

  @Delete(':id')
  public async deleteTodoById(@Param('id') id : string){
    Logger.log("Delete");
    return this.todoService.deleteTodoById(id);
  }

}
