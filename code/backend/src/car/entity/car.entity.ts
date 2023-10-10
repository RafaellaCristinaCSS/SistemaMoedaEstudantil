import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Car {
  constructor(data?: Partial<Car>) {
    if (data) {
      Object.assign(this, data);
    }
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255 })
  renavam: string;
  @Column({ type: 'integer' })
  year: number;
  @Column({ type: 'varchar', length: 255 })
  brand: string;

  @Column({ type: 'varchar', length: 255 })
  model: string;
  @Column({ type: 'varchar', length: 255 })
  license_plate: string;

  @Column({ type: 'boolean' })
  is_rented: boolean;

  @Column({ type: 'float' })
  daily_rate: number;
}
