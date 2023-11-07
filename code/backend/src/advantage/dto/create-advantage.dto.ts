import { IsNumber, IsString } from 'class-validator';
import { Advantage } from '../entity/advantage.entity';

export class CreateAdvantageDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;
  @IsNumber()
  value: number;
}

export function createAdvantageDTOToAdvantage(
  createAdvantageDTO: CreateAdvantageDTO,
): Advantage {
  return new Advantage({
    name: createAdvantageDTO.name,
    description: createAdvantageDTO.description,
    value: createAdvantageDTO.value,
  });
}
