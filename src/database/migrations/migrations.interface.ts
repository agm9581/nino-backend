// src/database/migrations/migration.interface.ts
export interface Migration {
  name: string;
  up(): Promise<void>;
  down(): Promise<void>;
}
