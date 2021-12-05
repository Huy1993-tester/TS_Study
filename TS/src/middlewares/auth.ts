import * as jwt from "jsonwebtoken";
import { baseConfig } from "../config/config";

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
      expiresIn: baseConfig.tokenExpire,
    };
  }
  public async token(): Promise<string> {
    const auth: string = jwt.sign(
      this.payload,
      this.secretkey,
      this.expires
    );
    return auth;
  }
}
