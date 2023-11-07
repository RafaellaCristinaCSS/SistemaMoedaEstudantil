import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Advantage } from '../entity/advantage.entity';
import { AdvantageService } from '../service/advantage.service';
import { AdvantageController } from '../controller/advantage.controller';

@Module({
  exports: [AdvantageService],
  imports: [TypeOrmModule.forFeature([Advantage])],
  controllers: [AdvantageController],
  providers: [AdvantageService],
})
export class AdvantageModule {}
