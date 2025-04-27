import { IsString, IsNotEmpty } from 'class-validator';

export class MessageDto {
  sender: string;

  content: string;
}
