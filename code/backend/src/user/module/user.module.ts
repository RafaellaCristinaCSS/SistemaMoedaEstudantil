import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvantageModule } from '../../advantage/module/advantage.module';

@Module({
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User]), AdvantageModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
