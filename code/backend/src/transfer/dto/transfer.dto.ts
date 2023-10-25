import { UserDTO, userToUserDTO } from '../../user/dto/user.dto';
import { Transfer } from '../entity/transfer.entity';

export class TransferDTO {
  value: number;
  student: UserDTO;
  teacher: UserDTO;
  reason: string;
}

export function transferToTransferDTO(transfer: Transfer): TransferDTO {
  return {
    value: transfer.value,
    teacher: userToUserDTO(transfer.teacher),
    student: userToUserDTO(transfer.student),
    reason: transfer.reason,
  };
}
