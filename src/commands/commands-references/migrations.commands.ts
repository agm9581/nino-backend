// src/commands/migrations.command.ts
import { Command, CommandRunner } from 'nest-commander';

import { MigrationsService } from '../../database/migrations/migrations.service';
import { InitialMigration } from '../../database/migrations/migration-references/1-initialMigration';

// Import other migrations here

@Command({ name: 'migrations:run', description: 'Run database migrations' })
export class RunMigrationsCommand extends CommandRunner {
  constructor(
    private readonly migrationService: MigrationsService,
    private readonly initialMigration: InitialMigration,

    // Inject other migrations here
  ) {
    super();
  }

  async run(): Promise<void> {
    const migrations = [this.initialMigration];

    await this.migrationService.executeMigrations(migrations);
    console.log('All migrations completed');
    process.exit(0);
  }
}
