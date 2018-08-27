import { BucketList } from './bucket-list.model';

export class User {
  constructor(
    public age: number,
    public bio: string,
    public bucketlist: BucketList[],
    public contact: string,
    public email: string,
    public name: string,
    public password: string,
    public username: string
  ) {}
}
