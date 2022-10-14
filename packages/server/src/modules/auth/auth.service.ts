import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from '@rns/dtos';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private jwtService: JwtService) {}

  async login(body: LoginInput) {
    if (body.email === 'oscar@cat.com' && body.password === 'Daisy') {
      const user = {
        id: 123,
        email: 'oscar@cat.com',
      };
      this.logger.log(
        `Credentials are matched, signing jwt for user ${user.email}`,
      );
      return this.jwtService.sign({ id: user.id, email: user.email });
    }

    this.logger.log(`Invalid login attempt for user ${body.email}`);

    throw new Error('WRONG_CREDENTIALS');
  }
}
