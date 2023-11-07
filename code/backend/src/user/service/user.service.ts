import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../../core/roles/roles.enum';
import { AssociateUserAdvantageDTO } from '../dto/associate-user-advantage.dto';
import { AdvantageService } from '../../advantage/service/advantage.service';
import { Advantage } from '../../advantage/entity/advantage.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly advantageService: AdvantageService,
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
  async saveUser(user: User): Promise<User> {
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

  async associateAdvantage(
    associateAdvantage: AssociateUserAdvantageDTO,
  ): Promise<void> {
    const advantage = await this.advantageService.getAdvantageById(
      associateAdvantage.advantage_id,
    );
    const user = await this.getUserById(associateAdvantage.user_id);
    if (user.coins >= advantage.value) {
      user.coins -= advantage.value;
      user.advantages
        ? user.advantages.push(advantage)
        : (user.advantages = [advantage]);
      await this.saveUser(user);
    } else {
      throw new BadRequestException(
        'You do not have coins enough for this advantage',
      );
    }
  }

  async getUserAdvantages(userId: string): Promise<Advantage[]> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['advantages'],
    });
    if (user.advantages) return user.advantages;
    return [];
  }
}
