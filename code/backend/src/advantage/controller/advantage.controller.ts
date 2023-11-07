import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AdvantageService } from '../service/advantage.service';
import { AdvantageDTO, advantageToAdvantageDTO } from '../dto/advantage.dto';
import {
  CreateAdvantageDTO,
  createAdvantageDTOToAdvantage,
} from '../dto/create-advantage.dto';

@Controller('/advantage')
export class AdvantageController {
  constructor(private readonly advantageService: AdvantageService) {}

  @Post()
  async createAdvantage(
    @Body(ValidationPipe) body: CreateAdvantageDTO,
  ): Promise<AdvantageDTO> {
    const advantage = await this.advantageService.createAdvantage(
      createAdvantageDTOToAdvantage(body),
    );
    return advantageToAdvantageDTO(advantage);
  }

  @Get()
  async getAllAdvantages(): Promise<AdvantageDTO[]> {
    const advantages = await this.advantageService.getAllAdvantages();
    return advantages.map((a) => advantageToAdvantageDTO(a));
  }
}
