import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';

type Todo = {
  id: string;
  title: string;
  description: string;
};

const todos: Todo[] = [
  { id: randomUUID(), title: 'Todo 1', description: 'Description 1' },
  { id: randomUUID(), title: 'Todo 2', description: 'Description 2' },
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
    return todos.push({ id: newId, ...body });
  }

  @Patch(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() body: { title: string; description: string },
  ) {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    todos[todoIndex] = { id, ...body };
    return todos[todoIndex];
  }
}
