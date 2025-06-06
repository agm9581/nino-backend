import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { MembersModule } from './members/members.module';
import { channelModule } from './chat/channel.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CommandsModule } from './commands/commands.module';
import configuration from './config/configuration';

@Module({
  imports: [
    AuthModule,
    MembersModule,
    channelModule,
    MongooseModule.forRoot('mongodb://localhost/nino-nest-db', {}),
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    CommandsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
