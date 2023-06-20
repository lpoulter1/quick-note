import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.todo.findMany();
  }

  create(todo: Todo) {
    return this.prisma.todo.create({ data: todo });
  }

  delete(id: string) {
    return this.prisma.todo.delete({ where: { id } });
  }

  update(id: string, todo: Todo) {
    return this.prisma.todo.update({
      where: {
        id: id,
      },
      data: { ...todo },
    });
  }
}
