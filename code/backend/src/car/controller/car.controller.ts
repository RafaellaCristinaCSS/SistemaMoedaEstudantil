import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  ValidationPipe,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CarService } from '../service/car.service';
import { CreateCarDTO, createCarDTOToCar } from '../dto/create-car.dto';
import { CarDTO, carToCarDTO } from '../dto/car.dto';
import { Roles } from '../../core/roles/roles.decorator';
import { Role } from '../../core/roles/roles.enum';
import { AuthGuard } from '../../auth/guard/auth.guard';

@Controller('/car')
@UseGuards(AuthGuard)
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @Roles(Role.Agent, Role.Bank)
  async createCar(@Body(ValidationPipe) body: CreateCarDTO): Promise<CarDTO> {
    const car = await this.carService.createCar(createCarDTOToCar(body));
    return carToCarDTO(car);
  }

  @Get()
  async getCarsNoRented(): Promise<CarDTO[]> {
    const carsNotRented = await this.carService.getCarsNotRented();
    return carsNotRented.map((c) => carToCarDTO(c));
  }

}
