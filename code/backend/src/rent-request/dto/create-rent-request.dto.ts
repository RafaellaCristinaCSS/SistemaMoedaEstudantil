import { IsUUID } from 'class-validator';

export class CreateRentRequestDTO {
  start: Date;

  end: Date;
  @IsUUID()
  car_id: string;
  @IsUUID()
  user_id: string;
}
