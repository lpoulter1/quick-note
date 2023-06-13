import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('players')
export class PlayersController {
  @Get()
  getPlayers(@Query('team') team: string) {
    return [team];
  }

  @Get('/:id')
  getOnePlayer(@Param('id') name: string): CreatePlayerDto {
    return { name };
  }

  @Post()
  createPlayer(@Body() body: CreatePlayerDto): CreatePlayerDto {
    return { name: body.name };
  }
}
