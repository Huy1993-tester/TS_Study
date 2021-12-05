import * as jwt from "jsonwebtoken";

export class CreateToken {
  public payload: object;
  public secretkey: string;
  public expires: object;
  constructor(dataEmail: string, dataId: number) {
    this.payload = {
      id: dataId,
      email: dataEmail,
    };
    this.secretkey = "abc45365";
    this.expires = {
      expiresIn: Date.now(),
    };
  }
  public async token(): Promise<string> {
    const auth: string = await jwt.sign(
      this.payload,
      this.secretkey,
      this.expires
    );
    return auth;
  }
}
