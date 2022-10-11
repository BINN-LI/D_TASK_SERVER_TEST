import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.md';
import { AuthController } from './auth.ctrl';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.sv';
import { JwtAccesTokenStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtAccesTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
