import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async hash(st: string) {
    return await bcrypt.hash(st, 10);
  }

  async compare(st: string, compare: string): Promise<boolean> {
    try {
      if (await bcrypt.compare(st, compare)) {
        return true;
      }
    } catch (err) {
      console.log(`Error comparing the password`, err);
      throw new ConflictException('Exception occured while hashing the data');
    }
    return false;
  }
}
