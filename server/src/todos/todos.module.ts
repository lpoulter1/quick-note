import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TodosService } from './todos.service';

@Module({
  providers: [TodosService],
  controllers: [TodosController],
  imports: [PrismaModule],
})
export class TodosModule {}
