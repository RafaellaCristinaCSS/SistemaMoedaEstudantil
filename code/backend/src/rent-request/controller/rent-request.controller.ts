import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { RentRequestService } from '../service/rent-request.service';
import { Roles } from '../../core/roles/roles.decorator';
import { Role } from '../../core/roles/roles.enum';
import { CreateRentRequestDTO } from '../dto/create-rent-request.dto';
import {
  RentRequestDTO,
  rentRequestToRentRequestDTO,
} from '../dto/rent-request.dto';
import { StatusENUM } from '../entity/rent-request.entity';

@Controller('/rent-request')
@UseGuards(AuthGuard)
export class RentRequestController {
  constructor(private readonly rentRequestService: RentRequestService) {}

  @Post()
  @Roles(Role.Client)
  async createRentRequest(
    @Body(ValidationPipe) body: CreateRentRequestDTO,
  ): Promise<RentRequestDTO> {
    const request = await this.rentRequestService.createRentRequest(body);
    return rentRequestToRentRequestDTO(request);
  }

  @Post('status/:id')
  @Roles(Role.Bank, Role.Agent)
  async changeRentRequestStatus(
    @Body(ValidationPipe) body: { status: StatusENUM },
    @Param('id', new ParseUUIDPipe()) requestId: string,
  ): Promise<void> {
    await this.rentRequestService.changeRentRequestStatus(
      requestId,
      body.status,
    );
  }

  @Get(':id')
  @Roles(Role.Client)
  async getRentRequest(
    @Param('id', new ParseUUIDPipe()) requestId: string,
  ): Promise<RentRequestDTO> {
    const request = await this.rentRequestService.getRequestById(requestId);
    return rentRequestToRentRequestDTO(request);
  }
  @Get('/user/:id')
  @Roles(Role.Client)
  async getRentRequestByUserId(
    @Param('id', new ParseUUIDPipe()) requestId: string,
  ): Promise<RentRequestDTO[]> {
    const request = await this.rentRequestService.getRequestByUserId(requestId);
    return request.map((r) => rentRequestToRentRequestDTO(r));
  }

  @Get()
  async getAllRentPendingRentRequest(): Promise<RentRequestDTO[]> {
    const request = await this.rentRequestService.getAllRentRequestPending();
    return request.map((r) => rentRequestToRentRequestDTO(r));
  }
}
