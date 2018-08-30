export class Comment {
  constructor(
    public senderName: string,
    public senderId: string,
    public comment: string,
    public dateSent: string,
    public replied: string
  ) {}
}
