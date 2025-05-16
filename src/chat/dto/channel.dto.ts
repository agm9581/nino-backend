import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ChannelDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsBoolean()
    @IsNotEmpty()
    private: boolean;
  
    @IsString()
    @IsNotEmpty()
    owner: string;
  
    @IsArray()
    @IsOptional()
    invitees?: string[];
  }