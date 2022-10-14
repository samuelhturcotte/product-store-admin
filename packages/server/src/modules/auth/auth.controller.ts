import { Controller, Post, Body } from '@nestjs/common';
import { ok } from '../../utils/httpUtils';
import { AuthService } from './auth.service';
import { LoginInput } from '@rns/dtos';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginInput) {
    return ok(await this.authService.login(body));
  }
}
