import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from '../../car/entity/car.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class RentRequest {
  constructor(data?: Partial<RentRequest>) {
    if (data) {
      Object.assign(this, data);
    }
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  start: Date;
  @Column({ type: 'timestamptz' })
  end: Date;

  @Column({ type: 'varchar' })
  status: StatusENUM;

  @JoinColumn({ name: 'car_id' })
  @ManyToOne(() => Car, {
    eager: true,
  })
  car: Car;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, {
    eager: true,
  })
  user: User;
}

export enum StatusENUM {
  PENDING = 'pending',
  APPROVED = 'approved',
  DENIED = 'denied',
}
