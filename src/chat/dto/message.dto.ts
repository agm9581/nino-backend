import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  channelId: string;

  @IsArray()
  @IsOptional()
  receivers?: string[];

  @IsArray()
  @IsOptional()
  participants?: string[];

  createdAt: any;
}
