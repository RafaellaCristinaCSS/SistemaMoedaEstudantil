import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {RentRequest, StatusENUM} from '../entity/rent-request.entity';
import {Repository} from 'typeorm';
import {CreateRentRequestDTO} from '../dto/create-rent-request.dto';
import {CarService} from '../../car/service/car.service';
import {UserService} from '../../user/service/user.service';

@Injectable()
export class RentRequestService {
  constructor(
    @InjectRepository(RentRequest)
    private readonly rentRequestRepository: Repository<RentRequest>,
    private readonly carService: CarService,
    private readonly userService: UserService,
  ) {}

  async createRentRequest(
    createRentRequest: CreateRentRequestDTO,
  ): Promise<RentRequest> {
    const car = await this.carService.getCarById(createRentRequest.car_id);
    const user = await this.userService.getUserById(createRentRequest.user_id);
    const request = new RentRequest({
      start: createRentRequest.start,
      end: createRentRequest.end,
      car,
      user,
    });
    return this.rentRequestRepository.save(request);
  }

  async changeRentRequestStatus(
    rentRequestId: string,
    status: StatusENUM,
  ): Promise<void> {
    const rentRequest = await this.getRequestById(rentRequestId);
    rentRequest.status = status;
    if (status === StatusENUM.APPROVED)
      await this.carService.rentACar(rentRequest.car);
    await this.rentRequestRepository.save(rentRequest);
  }

  async getRequestById(id: string): Promise<RentRequest> {
    return this.rentRequestRepository.findOne({ where: { id: id } });
  }

  async getRequestByUserId(id: string): Promise<RentRequest[]> {
    return this.rentRequestRepository.find({ where: { user: { id: id } } });
  }

  async getAllRentRequestPending(): Promise<RentRequest[]> {
    return this.rentRequestRepository.find({where:{status: StatusENUM.PENDING}})
  }
}
