import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Migration } from './migrations.interface';

@Injectable()
export class MigrationsService {
  constructor(@InjectConnection() private connection: Connection) {}

  //This approach is to store the migrations in the database together with the timestamp of when they were executed
  async executeMigrations(migrations: Migration[]): Promise<void> {
    const migrationCollection = this.connection.collection('migrations');
    console.log('Starting migrations execution');
    console.log(`Database connection status: ${this.connection.readyState}`);

    // Create migration collection if it doesn't exist
    const collections = await this.connection.db?.listCollections({ name: 'migrations' }).toArray();
    if (collections?.length === 0) {
      await migrationCollection.createIndex({ name: 1 }, { unique: true });
    }

    //Loop over the possible migrations, this should be done in order of creation of the migration
    for (const migration of migrations) {
      const migrationRecord = await migrationCollection.findOne({ name: migration.name });
      console.log('Got migrations collection reference');

      if (!migrationRecord) {
        console.log(`Executing migration: ${migration.name}`);
        await migration.up();
        await migrationCollection.insertOne({ name: migration.name, executedAt: new Date() });
        console.log(`Migration ${migration.name} completed successfully`);
      } else {
        console.log(`Migration ${migration.name} already executed`);
      }
    }
  }

  async rollbackMigration(migrationName: string, migrations: Migration[]): Promise<void> {
    const migrationCollection = this.connection.collection('migrations');
    const migration = migrations.find((m) => m.name === migrationName);

    if (!migration) {
      throw new Error(`Migration ${migrationName} not found`);
    }

    const migrationRecord = await migrationCollection.findOne({ name: migrationName });
    //can rollback a single migrations regardless of timeline?
    if (migrationRecord) {
      console.log(`Rolling back migration: ${migrationName}`);
      await migration.down();
      await migrationCollection.deleteOne({ name: migrationName });
      console.log(`Rollback of ${migrationName} completed successfully`);
    } else {
      console.log(`Migration ${migrationName} has not been executed`);
    }
  }
}
