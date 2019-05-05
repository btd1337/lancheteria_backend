import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';

import { User } from './user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.usersService.findOne(+id).catch(() => {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    });
  }
}
