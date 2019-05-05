import { Injectable } from '@nestjs/common';

import { User } from './user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      name: 'Peter Parker',
      email: 'peter@marvel.com',
    },
    {
      name: 'Bruce Wayne',
      email: 'bruce@dc.com',
    },
  ];

  findAll(): User[] {
    return this.users;
  }
}
