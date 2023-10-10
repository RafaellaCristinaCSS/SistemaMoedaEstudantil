import { Module } from '@nestjs/common';
import { RentRequestService } from '../service/rent-request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentRequest } from '../entity/rent-request.entity';
import { RentRequestController } from '../controller/rent-request.controller';
import { CarModule } from '../../car/module/car.module';
import { UserModule } from '../../user/module/user.module';

@Module({
  exports: [RentRequestService],
  imports: [TypeOrmModule.forFeature([RentRequest]), CarModule, UserModule],
  controllers: [RentRequestController],
  providers: [RentRequestService],
})
export class RentRequestModule {}
