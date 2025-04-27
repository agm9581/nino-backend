// src/database/migrations/migrations/1650000000000-CreateUsers.ts

import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Migration } from '../migrations.interface';

@Injectable()
export class CreateUsersMigration implements Migration {
  name = '1-createUsersCollection';

  constructor(@InjectConnection() private connection: Connection) {}

  async up(): Promise<void> {
    const db = this.connection.db;

    // Create users collection with validation
    await db?.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              bsonType: 'string',
            },
            password: {
              bsonType: 'string',
            },
          },
        },
      },
    });

    // Create index on email field
    await db?.collection('users').createIndex({ email: 1 }, { unique: true });
  }

  async down(): Promise<void> {
    const db = this.connection.db;
    await db?.collection('users').drop();
  }
}
