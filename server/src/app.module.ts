import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [PlayersModule, TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
