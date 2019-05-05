import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';

import { User } from './user.interface';
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
  findOne(@Param('id') id) {
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
}
