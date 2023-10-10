import { User } from '../entity/user.entity';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { Role } from '../../core/roles/roles.enum';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  cpf: string;

  role: Role;
  @IsString()
  @IsOptional()
  address: string;
  @IsString()
  @IsOptional()
  course: string;
  @IsString()
  @IsOptional()
  university: string;
}

export function createUserDTOToUser(createUserDTO: CreateUserDTO): User {
  return new User({
    name: createUserDTO.name,
    password: createUserDTO.password,
    email: createUserDTO.email,
    cpf_cnpj: createUserDTO.cpf,
    role: createUserDTO.role,
    address: createUserDTO.address,
    university: createUserDTO.university,
    course: createUserDTO.course,
  });
}
