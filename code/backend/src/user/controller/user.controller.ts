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
import { User } from '../entity/user.entity';
import { AssociateUserAdvantageDTO } from '../dto/associate-user-advantage.dto';
import {
  AdvantageDTO,
  advantageToAdvantageDTO,
} from '../../advantage/dto/advantage.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body(ValidationPipe) body: CreateUserDTO,
  ): Promise<UserDTO> {
    const user = await this.userService.saveUser(createUserDTOToUser(body));
    return userToUserDTO(user);
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserDTO> {
    const user = await this.userService.getUserById(id);
    return userToUserDTO(user);
  }

  @Get('/name/:name')
  async getUserByName(@Param('name') name: string): Promise<UserDTO> {
    const user = await this.userService.getUserByName(name);
    return userToUserDTO(user);
  }

  @Get()
  async getAllStudents(): Promise<User[]> {
    return await this.userService.getAllStudents();
  }

  @Post('/add/advantage')
  async associateAdvantage(
    @Body(ValidationPipe) body: AssociateUserAdvantageDTO,
  ): Promise<void> {
    await this.userService.associateAdvantage(body);
  }

  @Get('/:id/advantage')
  async getUserAdvantages(@Param('id') id: string): Promise<AdvantageDTO[]> {
    const advantages = await this.userService.getUserAdvantages(id);
    return advantages.map((a) => advantageToAdvantageDTO(a));
  }
}
