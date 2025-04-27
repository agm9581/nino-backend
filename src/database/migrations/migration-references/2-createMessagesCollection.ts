import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Migration } from '../migrations.interface';

@Injectable()
export class CreateMessagesMigration implements Migration {
  name = '2-createMessagesCollection'; // Adjust the number to fit the sequence

  constructor(@InjectConnection() private connection: Connection) {}

  async up(): Promise<void> {
    const db = this.connection.db;

    // Create messages collection with validation
    await db?.createCollection('messages', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['sender', 'content'],
          properties: {
            sender: {
              bsonType: 'objectId', // Reference to Member (ObjectId type)
              description: 'must be an ObjectId and is required',
            },
            content: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            createdAt: {
              bsonType: 'date',
              description: 'timestamp when the message was created',
            },
            updatedAt: {
              bsonType: 'date',
              description: 'timestamp when the message was last updated',
            },
          },
        },
      },
    });

    // Create index on `createdAt` for efficient sorting (e.g., for fetching messages by date)
    await db?.collection('messages').createIndex({ createdAt: 1 });
  }

  async down(): Promise<void> {
    const db = this.connection.db;
    await db?.collection('messages').drop();
  }
}
