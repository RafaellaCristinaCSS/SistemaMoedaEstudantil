import { Module } from '@nestjs/common';
import { CarService } from '../service/car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../entity/car.entity';
import { CarController } from '../controller/car.controller';

@Module({
  exports: [CarService],
  imports: [TypeOrmModule.forFeature([Car])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
