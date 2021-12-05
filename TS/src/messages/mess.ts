export class Messages {
  public messages: string;
  constructor(mess: string) {
    this.messages = mess;
  }
  public showMess() {
    return this.messages;
  }
}
