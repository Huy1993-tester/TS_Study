import argon2 from "argon2";

export class Encoding {
  public password: string;
  constructor(pass: string) {
    this.password = pass;
  }
  public encoding() {
    return argon2.hash(this.password);
  }
}

export class VerifyEncoding {
    public password: string;
    public userPassword: string;
    constructor(pass: string, userPass: string) {
      this.password = pass;
      this.userPassword = userPass;
    }
    public verifyEncoding():Promise<boolean>{
      return argon2.verify(this.userPassword, this.password);
    }
  }
