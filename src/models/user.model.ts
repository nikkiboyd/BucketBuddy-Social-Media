import { BucketList } from './bucketlist.model';

export class User {
  constructor(
    public age: number,
    public bio: string,
    public bucketlist: BucketList[],
    public comments: string[],
    public contact: string,
    public email: string,
    public friends: string[],
    public name: string,
    public password: string,
    public username: string
  ) {}
}
