import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from '../entity/transfer.entity';
import { UserService } from '../../user/service/user.service';
import { CreateTransferDTO } from '../dto/create-transfer.dto';
import { User } from '../../user/entity/user.entity';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private readonly transferRepository: Repository<Transfer>,
    private userService: UserService,
  ) {}

  async createTransfer(
    createTransferDTO: CreateTransferDTO,
  ): Promise<Transfer> {
    const teacher = await this.userService.getUserById(
      createTransferDTO.teacher_id,
    );
    const student = await this.userService.getUserById(
      createTransferDTO.student_id,
    );
    this.checkTeacherBalance(teacher, createTransferDTO.value);
    const transfer = new Transfer({
      student: student,
      teacher: teacher,
      value: createTransferDTO.value,
    });
    await Promise.all([
      this.userService.removeCoinsToUser(teacher, createTransferDTO.value),
      this.userService.addCoins(student, createTransferDTO.value),
    ]);
    return this.transferRepository.save(transfer);
  }

  async getTransferByTeacherId(teacherId: string): Promise<Transfer[]> {
    const teacher = await this.userService.getUserById(teacherId);
    return this.transferRepository.find({ where: { teacher: teacher } });
  }

  private checkTeacherBalance(teacher: User, desiredValue: number) {
    if (teacher.coins < desiredValue) {
      throw new BadRequestException('the teacher does not have enough coins');
    }
  }
}
