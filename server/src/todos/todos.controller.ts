import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
// import { type Todo } from '../../../sharedTypes';
import { TodosService } from './todos.service';
import { Todo } from '@prisma/client';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  getTodos() {
    return this.todoService.findAll();
  }

  @Post()
  createTodo(@Body() body: { title: string; description: string }) {
    const newId = randomUUID();
    return this.todoService.create({ id: newId, done: false, ...body });
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.delete(id);
  }

  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() body: Todo) {
    return this.todoService.update(id, body);
  }
}
