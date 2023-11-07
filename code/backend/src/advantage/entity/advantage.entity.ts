import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Advantage {
  constructor(data?: Partial<Advantage>) {
    if (data) {
      Object.assign(this, data);
    }
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'varchar', length: 255 })
  description: string;
  @Column({ type: 'integer' })
  value: number;

  @ManyToMany(() => User, (user) => user)
  @JoinTable({
    name: 'advantage_user',
    joinColumn: { name: 'advantage_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];
}
