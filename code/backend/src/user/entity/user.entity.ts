import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../core/roles/roles.enum';
import { Advantage } from '../../advantage/entity/advantage.entity';

@Entity()
export class User {
  constructor(data?: Partial<User>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 11, nullable: true })
  cpf_cnpj: string;

  @Column({ type: 'varchar', length: 255 })
  role: Role;

  @Column({ type: 'varchar', length: 255 })
  course: string;

  @Column({ type: 'varchar', length: 255 })
  university: string;
  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'integer' })
  coins: number;

  @ManyToMany(() => Advantage, (advantage) => advantage, { eager: true })
  @JoinTable({
    name: 'advantage_user',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'advantage_id' },
  })
  advantages: Advantage[];
}
