// src/database/migrations/migrations/1650000000000-CreateUsers.ts

import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Migration } from '../migrations.interface';

@Injectable()
export class InitialMigration implements Migration {
  name = '1-initialMigration';

  constructor(@InjectConnection() private connection: Connection) {}

  async up(): Promise<void> {
    const db = this.connection.db;

    // Create members collection with validation
    await db?.createCollection('members', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['email', 'password', 'firstName', 'secondName', 'username', 'nickname'],
          properties: {
            email: {
              bsonType: 'string',
            },
            password: {
              bsonType: 'string',
            },
            firstName: {
              bsonType: 'string',
            },
            secondName: {
              bsonType: 'string',
            },
            nickname: {
              bsonType: 'string',
            },
            username: {
              bsonType: 'string',
            },
            friends: {
              bsonType: 'array',
              items: {
                bsonType: 'object',
                properties: {
                  memberId: {
                    bsonType: 'objectId',
                  },
                  status: {
                    enum: ['invited', 'blocked', 'friend'],
                  },
                },
              },
            },
            memberStatus: {
              bsonType: 'string',
            },
            createdAt: {
              bsonType: 'date',
            },
            updatedAt: {
              bsonType: 'date',
            },
          },
        },
      },
    });
    //Create message collections
    await db?.createCollection('messages', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['sender', 'content', 'channelId'],
          properties: {
            sender: {
              bsonType: 'objectId',
            },
            receivers: {
              bsonType: 'array',
              items: {
                bsonType: 'objectId',
              },
            },
            content: {
              bsonType: 'string',
            },
            channelId: {
              bsonType: 'objectId',
            },
            participants: {
              bsonType: 'array',
              items: {
                bsonType: 'objectId',
              },
            },
            createdAt: {
              bsonType: 'date',
            },
            updatedAt: {
              bsonType: 'date',
            },
          },
        },
      },
    });

    await db?.createCollection('channels', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['title', 'private'],
          properties: {
            title: {
              bsonType: 'string',
            },
            private: {
              bsonType: 'bool',
            },
            owner: {
              bsonType: 'objectId',
            },
            invitees: {
              bsonType: 'array',
              items: {
                bsonType: 'objectId',
              },
            },
            createdAt: {
              bsonType: 'date',
            },
            updatedAt: {
              bsonType: 'date',
            },
          },
        },
      },
    });

    // Create indexes
    await db?.collection('members').createIndex({ email: 1 }, { unique: true });
    await db?.collection('members').createIndex({ username: 1 }, { unique: true });
    await db?.collection('messages').createIndex({ sender: 1 });
    await db?.collection('channels').createIndex({ owner: 1 });
  }

  async down(): Promise<void> {
    const db = this.connection.db;
    await db?.collection('members').drop();
    await db?.collection('messages').drop();
    await db?.collection('channels').drop();
  }
}
