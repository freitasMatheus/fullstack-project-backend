import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(email: string): Promise<Promise<User> | null> {
    return this.userRepository.findOneBy({ email });
  }

  create(userData: Partial<User>): User {
    return this.userRepository.create(userData);
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
