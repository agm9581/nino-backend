import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class MessageDto {
  sender: string;
  content: string;
  createdAt: string; // ISO string representation of the date
}
