import { CarDTO, carToCarDTO } from '../../car/dto/car.dto';
import { UserDTO, userToUserDTO } from '../../user/dto/user.dto';
import {RentRequest, StatusENUM} from '../entity/rent-request.entity';

export class RentRequestDTO {
  constructor(data?: Partial<RentRequestDTO>) {
    if (data) {
      Object.assign(this, data);
    }
  }
  id: string;
  start: Date;
  end: Date;
  car: CarDTO;
  user: UserDTO;
  total_value: number;
  status: StatusENUM;
}

export function rentRequestToRentRequestDTO(
  rentRequest: RentRequest,
): RentRequestDTO {
  function getTotalValue() {
    const end = new Date(rentRequest.end).getTime();
    const start = new Date(rentRequest.start).getTime();
    return (
      Math.floor((end - start) / (1000 * 60 * 60 * 24)) *
      rentRequest.car.daily_rate
    );
  }

  return new RentRequestDTO({
    id: rentRequest.id,
    start: rentRequest.start,
    end: rentRequest.end,
    car: carToCarDTO(rentRequest.car),
    user: userToUserDTO(rentRequest.user),
    total_value: getTotalValue(),
    status: rentRequest.status,
  });
}
