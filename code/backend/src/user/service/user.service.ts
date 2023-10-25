import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../../core/roles/roles.enum';

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

  async getUserByName(name: string): Promise<User> {
    return this.userRepository.findOne({ where: { name: name } });
  }

  async getAllStudents(): Promise<User[]> {
    return this.userRepository.find({ where: { role: Role.STUDENT } });
  }
  async createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async removeCoinsToUser(user: User, valueDecreased: number): Promise<void> {
    user.coins -= valueDecreased;
    if (user.coins < 0) {
      throw new BadRequestException('the coins cannot be less than zero');
    }
    await this.userRepository.save(user);
  }

  async addCoins(user: User, valueAdded: number): Promise<void> {
    user.coins += valueAdded;
    await this.userRepository.save(user);
  }
}
