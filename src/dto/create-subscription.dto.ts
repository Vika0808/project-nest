import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsNumber()
  subscribed_to_user_id: number;
}
