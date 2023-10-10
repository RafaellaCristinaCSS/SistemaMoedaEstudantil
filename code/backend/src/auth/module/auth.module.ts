import { Module } from '@nestjs/common';
import { UserModule } from '../../user/module/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../controller/auth.controller';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  exports: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      // secret: '123',
      secret:
        'c44225b4c4f1a832265baa57ee398d24205f0bb841d11bca87c00202c220ddcb',
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
