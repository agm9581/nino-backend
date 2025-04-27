// src/database/migrations/migration.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MigrationsService } from './migrations.service';

@Module({
  imports: [MongooseModule.forFeature([])],
  providers: [MigrationsService],
  exports: [MigrationsService],
})
export class MigrationsModule {}
