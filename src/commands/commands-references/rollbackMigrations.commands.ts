import { Command, CommandRunner, Option } from 'nest-commander';

import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { InitialMigration } from '../../database/migrations/migration-references/1-initialMigration';

@Command({ name: 'migrations:rollback', description: 'Rollback the initial migration' })
export class MigrationsRollbackCommand extends CommandRunner {
  constructor(@InjectConnection() private connection: Connection) {
    super();
  }

  async run(passedParam: string[], options?: Record<string, any>): Promise<void> {
    const migration = new InitialMigration(this.connection);
    console.log('⏬ Running migration down()...');
    await migration.down();
    console.log('✅ Collections dropped successfully.');
  }
}
