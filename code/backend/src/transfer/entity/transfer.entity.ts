import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Transfer {
  constructor(data?: Partial<Transfer>) {
    if (data) {
      Object.assign(this, data);
    }
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn({ name: 'student_id' })
  @ManyToOne(() => User, {
    eager: true,
  })
  student: User;

  @JoinColumn({ name: 'teacher_id' })
  @ManyToOne(() => User, {
    eager: true,
  })
  teacher: User;
  @Column({ type: 'integer' })
  value: number;
}
