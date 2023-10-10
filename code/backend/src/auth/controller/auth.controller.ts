import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { AuthService } from '../service/auth.service';
import { UserDTO } from '../../user/dto/user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post()
  async signIn(
    @Body(ValidationPipe) body: { password: string; email: string },
  ): Promise<{ access_token: string }> {
    return this.authService.signIn(body.email, body.password);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/info')
  // @Roles(Role.Client)
  @UseGuards(AuthGuard)
  async getProfile(@Request() req): Promise<UserDTO> {
    return await this.authService.getUserByEmail(req.user.username);
  }
}
