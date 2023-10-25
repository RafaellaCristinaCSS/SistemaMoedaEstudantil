import { IsInt } from 'class-validator';

export class CreateTransferDTO {
  @IsInt()
  value: number;
  student_id: string;
  teacher_id: string;
  reason: string;
}
