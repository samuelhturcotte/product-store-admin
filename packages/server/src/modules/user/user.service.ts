import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async findUser({ id }): Promise<any> {
    return {
      id,
      email: 'oscar@cat.com',
      fullName: 'Oscar Cat',
      password: 'Daisy',
      emailVerified: true,
    };
  }
}
