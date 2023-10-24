import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDTO, createUserDTOToUser } from '../dto/create-user.dto';
import { UserDTO, userToUserDTO } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body(ValidationPipe) body: CreateUserDTO,
  ): Promise<UserDTO> {
    const user = await this.userService.createUser(createUserDTOToUser(body));
    return userToUserDTO(user);
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserDTO> {
    const user = await this.userService.getUserById(id);
    return userToUserDTO(user);
  }
}
