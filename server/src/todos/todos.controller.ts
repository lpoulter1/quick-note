import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { type Todo } from '../../../sharedTypes';

const todos: Todo[] = [
  {
    id: randomUUID(),
    title: 'Todo 1',
    description: 'Description 1',
    done: false,
  },
  {
    id: randomUUID(),
    title: 'Todo 2',
    description: 'Description 2',
    done: false,
  },
  {
    id: randomUUID(),
    title: 'Todo 3',
    description: 'Description done',
    done: true,
  },
];

@Controller('todos')
export class TodosController {
  @Get()
  getTodos() {
    return todos;
  }

  @Post()
  createTodo(@Body() body: { title: string; description: string }) {
    const newId = randomUUID();
    return todos.push({ id: newId, done: false, ...body });
  }

  @Patch(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() body: { title: string; description: string; done: boolean },
  ) {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    todos[todoIndex] = { id, ...body };
    return todos[todoIndex];
  }
}
