import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTransferDTO } from '../dto/create-transfer.dto';
import { TransferService } from '../service/transfer.service';
import { TransferDTO, transferToTransferDTO } from '../dto/transfer.dto';
import { Roles } from '../../core/roles/roles.decorator';
import { Role } from '../../core/roles/roles.enum';

@Controller('/transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  @Roles(Role.TEACHER)
  async createTransfer(
    @Body(ValidationPipe) body: CreateTransferDTO,
  ): Promise<TransferDTO> {
    const transfer = await this.transferService.createTransfer(body);
    return transferToTransferDTO(transfer);
  }

  @Get('/teacher/:id')
  @Roles(Role.TEACHER)
  async getTransferByTeacher(
    @Param('id', new ParseUUIDPipe()) teacherId: string,
  ): Promise<TransferDTO[]> {
    const transfer = await this.transferService.getTransferByTeacherId(
      teacherId,
    );
    return transfer.map((t) => transferToTransferDTO(t));
  }
}
