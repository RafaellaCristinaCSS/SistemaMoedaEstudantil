import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } });
  }
  async createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
