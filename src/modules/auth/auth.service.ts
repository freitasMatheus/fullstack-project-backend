import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { AccessTokenType } from './types/access-token.type';
import { AuthRegisterDto } from './dtos/auth-register.dto';
import { AuthResponseType } from './types/auth-response.type';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<User> {
    const user: User | null = await this.usersService.findOne(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  login(user: User): AccessTokenType {
    const payload: JwtPayload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: AuthRegisterDto): Promise<AuthResponseType> {
    const existingUser = await this.usersService.findOne(userDto.email);
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser = this.usersService.create({
      email: userDto.email,
      password: hashedPassword,
    });

    await this.usersService.save(newUser);
    const payload: JwtPayload = { email: newUser.email, sub: newUser.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    };
  }
}
