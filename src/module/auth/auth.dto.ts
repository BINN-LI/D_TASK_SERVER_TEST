import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginInput {
  @ApiProperty({
    description: '로그인 이메일',
    type: String,
    required: true,
    nullable: false,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '패스워드',
    type: String,
    required: true,
    nullable: false,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}
