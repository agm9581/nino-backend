// src/commands/command.module.ts
import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RunMigrationsCommand } from './commands-references/migrations.commands';
import { MigrationsModule } from '../database/migrations/migrations.module';
import { CreateUsersMigration } from '../database/migrations/migration-references/1-createUsersCollection';
import { CreateMessagesMigration } from '../database/migrations/migration-references/2-createMessagesCollection';

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
  providers: [RunMigrationsCommand, CreateUsersMigration, CreateMessagesMigration],
})
export class CommandsModule {}
