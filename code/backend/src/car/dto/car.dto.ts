import { Car } from '../entity/car.entity';

export class CarDTO {
  constructor(data?: Partial<CarDTO>) {
    if (data) {
      Object.assign(this, data);
    }
  }
  id: string;
  renavam: string;

  year: number;

  brand: string;

  model: string;

  license_plate: string;
  is_rented: boolean;
  daily_rate: number;
}
export function carToCarDTO(car: Car): CarDTO {
  return new CarDTO({
    id: car.id,
    renavam: car.renavam,
    year: car.year,
    brand: car.brand,
    model: car.model,
    license_plate: car.license_plate,
    is_rented: car.is_rented,
    daily_rate: car.daily_rate,
  });
}
