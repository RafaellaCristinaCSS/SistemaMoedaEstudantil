import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5436,
      username: 'postgres',
      password: 'password',
      database: 'lab_moedas',
      autoLoadEntities: true,
    };
  }
}
