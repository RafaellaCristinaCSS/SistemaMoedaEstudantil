import { Advantage } from '../entity/advantage.entity';

export class AdvantageDTO {
  constructor(data?: Partial<AdvantageDTO>) {
    if (data) {
      Object.assign(this, data);
    }
  }
  id: string;
  name: string;
  description: string;
  value: number;
}

export function advantageToAdvantageDTO(advantage: Advantage): AdvantageDTO {
  return new AdvantageDTO({
    id: advantage.id,
    name: advantage.name,
    description: advantage.description,
    value: advantage.value,
  });
}
