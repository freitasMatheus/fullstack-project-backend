import { BadRequestException, Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dtos/auth-register.dto';
import { AccessTokenType } from './types/access-token.type';
import { AuthResponseType } from './types/auth-response.type';
import { LocalAuthGuard } from './guard/local.guard';
import { AuthRequestType } from './types/auth-request.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: AuthRequestType): Promise<AccessTokenType | BadRequestException> {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body() registerBody: AuthRegisterDto,
  ): Promise<AuthResponseType | BadRequestException> {
    return await this.authService.register(registerBody);
  }
}
