import { Body, Controller, Get, Post } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginInput } from './auth.dto';
import { AuthService } from './auth.sv';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: '유저 로그인',
    description: '로그인 성공 후 토큰값 리턴',
  })
  async login(@Body() loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }
}
