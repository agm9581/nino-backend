// src/commands/command.module.ts
import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RunMigrationsCommand } from './commands-references/migrations.commands';
import { MigrationsModule } from '../database/migrations/migrations.module';
import { InitialMigration } from '../database/migrations/migration-references/1-initialMigration';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MigrationsModule,
  ],
  providers: [RunMigrationsCommand, InitialMigration],
})
export class CommandsModule {}
