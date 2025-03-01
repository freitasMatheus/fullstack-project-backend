import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class AuthRegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/, {
    message: 'A senha deve conter letras e números',
  })
  password: string;
}
