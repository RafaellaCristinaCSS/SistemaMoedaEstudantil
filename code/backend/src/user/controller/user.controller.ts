import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
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
}
