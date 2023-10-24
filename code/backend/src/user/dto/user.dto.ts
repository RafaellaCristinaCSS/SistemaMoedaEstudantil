import { User } from '../entity/user.entity';

export class UserDTO {
  constructor(data?: Partial<UserDTO>) {
    if (data) {
      Object.assign(this, data);
    }
  }
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: string;
  address: string;
  course: string;
  university: string;
  coins: number;
}

export function userToUserDTO(user: User): UserDTO {
  return new UserDTO({
    id: user.id,
    name: user.name,
    email: user.email,
    cpf: user.cpf_cnpj,
    role: user.role,
    address: user.address,
    course: user.course,
    university: user.university,
    coins: user.coins,
  });
}
