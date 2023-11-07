import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advantage } from '../../advantage/entity/advantage.entity';

@Injectable()
export class AdvantageService {
  constructor(
    @InjectRepository(Advantage)
    private readonly advantageRepository: Repository<Advantage>,
  ) {}

  async createAdvantage(advantage: Advantage): Promise<Advantage> {
    return this.advantageRepository.save(advantage);
  }

  async getAllAdvantages(): Promise<Advantage[]> {
    return this.advantageRepository.find();
  }

  async getAdvantageById(advantageId: string): Promise<Advantage> {
    return this.advantageRepository.findOne({ where: { id: advantageId } });
  }
}
