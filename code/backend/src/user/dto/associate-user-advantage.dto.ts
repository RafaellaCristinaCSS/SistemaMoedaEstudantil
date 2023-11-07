import { IsUUID } from 'class-validator';

export class AssociateUserAdvantageDTO {
  @IsUUID()
  user_id: string;

  @IsUUID()
  advantage_id: string;
}
