import { Injectable } from '@nestjs/common';

import { User } from './user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Peter Parker',
      email: 'peter@marvel.com',
    },
    {
      id: 2,
      name: 'Bruce Wayne',
      email: 'bruce@dc.com',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): Promise<User> {
    const search = this.users.find(user => user.id === id);
    return search ? Promise.resolve(search) : Promise.reject();
  }
}
