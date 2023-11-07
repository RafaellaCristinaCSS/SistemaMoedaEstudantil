import { Module } from '@nestjs/common';
import { UserModule } from '../user/module/user.module';
import { TypeOrmConfigService } from './db-config/type-orm-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/module/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from '../core/errors/http-exception.filters';
import { RolesGuard } from '../core/roles/roles.guard';
import { CarModule } from '../car/module/car.module';
import { RentRequestModule } from '../rent-request/module/rent-request.module';
import { TransferModule } from '../transfer/module/transfer.module';
import { AdvantageModule } from '../advantage/module/advantage.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CarModule,
    TransferModule,
    AdvantageModule,
    RentRequestModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
