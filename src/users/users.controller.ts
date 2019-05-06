import { Response } from 'express';

import {
	Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Res
} from '@nestjs/common';

import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll().catch(error => {
      switch (error.status) {
        default:
          throw new HttpException(
            'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    });
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return this.usersService
      .findOne(+id)
      .then(data => {
        if (!data) {
          throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
        }
      })
      .catch(error => {
        switch (error.status) {
          case 404: {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
          }
          default:
            throw new HttpException(
              'Internal server error',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      });
  }

  @Post()
  async create(@Body() user: User, @Res() res: Response) {
    return this.usersService
      .create(user)
      .then(data => {
        data.password = undefined;
        res.status(HttpStatus.CREATED).json(data);
      })
      .catch(error => {
        switch (error.status) {
          default:
            throw new HttpException(
              'Internal server error',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: User, @Res() res: Response) {
    return this.usersService
      .update(+id, user)
      .then(data => {
        if (!data) {
          throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
        }
        data.password = undefined;
        res.json(data);
      })
      .catch(error => {
        switch (error.status) {
          case 404: {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
          }
          default:
            throw new HttpException(
              'Internal server error',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.usersService
      .delete(+id)
      .then(data => {
        if (!data.affected) {
          throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
        }
      })
      .catch(error => {
        switch (error.status) {
          case 404: {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
          }
          default:
            throw new HttpException(
              'Internal server error',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      });
  }
}
