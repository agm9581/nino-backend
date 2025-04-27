// src/commands/migrations.command.ts
import { Command, CommandRunner } from 'nest-commander';
import { CreateUsersMigration } from '../../database/migrations/migration-references/1-createUsersCollection';

import { MigrationsService } from '../../database/migrations/migrations.service';
import { CreateMessagesMigration } from '../../database/migrations/migration-references/2-createMessagesCollection';

// Import other migrations here

@Command({ name: 'migrations:run', description: 'Run database migrations' })
export class RunMigrationsCommand extends CommandRunner {
  constructor(
    private readonly migrationService: MigrationsService,
    private readonly createUsersMigration: CreateUsersMigration,
    private readonly createMessagesMigration: CreateMessagesMigration,
    // Inject other migrations here
  ) {
    super();
  }

  async run(): Promise<void> {
    const migrations = [this.createUsersMigration, this.createMessagesMigration];

    await this.migrationService.executeMigrations(migrations);
    console.log('All migrations completed');
    process.exit(0);
  }
}
