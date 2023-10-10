import { IsString, IsNumber } from 'class-validator';
import { Car } from '../entity/car.entity';

export class CreateCarDTO {
  @IsString()
  renavam: string;
  @IsNumber()
  year: number;
  @IsString()
  brand: string;
  @IsString()
  model: string;
  @IsString()
  license_plate: string;

  @IsNumber()
  daily_rate: number;
}
export function createCarDTOToCar(createCarDTO: CreateCarDTO): Car {
  return new Car({
    renavam: createCarDTO.renavam,
    year: createCarDTO.year,
    brand: createCarDTO.brand,
    model: createCarDTO.model,
    license_plate: createCarDTO.license_plate,
    daily_rate: createCarDTO.daily_rate,
  });
}
