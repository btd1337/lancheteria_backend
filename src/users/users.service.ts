import { DeleteResult, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserCreateDto } from './user-create.dto';
import { UserUpdateDto } from './user-update.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: UserCreateDto): Promise<User> {
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async update(id: number, user: UserUpdateDto): Promise<User> {
    if (await this.userRepository.findOne(id)) {
      if (user.id !== id) {
        user.id = id;
      }
      return this.userRepository.save(user);
    } else {
      return undefined;
    }
  }
}
