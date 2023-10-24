import { Module } from '@nestjs/common';
import { TransferService } from '../service/transfer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from '../entity/transfer.entity';
import { TransferController } from '../controller/transfer.controller';
import { UserModule } from '../../user/module/user.module';

@Module({
  exports: [TransferService],
  imports: [TypeOrmModule.forFeature([Transfer]), UserModule],
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}
