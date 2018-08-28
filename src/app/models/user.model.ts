import { BucketList } from './bucketlist.model';

export class User {
  constructor(
    public username: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public phone: number,
    public email: string,
    public dob: Date,
    public bio: string,
    public bucketlist: BucketList[],
    public comments: string[],
    public friends: string[],
  ) {}
}
