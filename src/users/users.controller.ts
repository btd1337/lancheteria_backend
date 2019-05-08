import { Response } from 'express';

import {
	Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Res
} from '@nestjs/common';

import { UserCreateDto } from './user-create.dto';
import { UserUpdateDto } from './user-update.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return this.usersService.findOne(+id).then(data => {
      if (!data) {
        throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
      }
    });
  }

  @Post()
  async create(@Body() user: UserCreateDto, @Res() res: Response) {
    return this.usersService.create(user).then(data => {
      data.password = undefined;
      res.status(HttpStatus.CREATED).json(data);
    });
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() user: UserUpdateDto,
    @Res() res: Response,
  ) {
    return this.usersService.update(+id, user).then(data => {
      if (!data) {
        throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
      }
      data.password = undefined;
      res.json(data);
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id).then(data => {
      if (!data.affected) {
        throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
      }
    });
  }
}
