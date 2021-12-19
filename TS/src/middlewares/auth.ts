import * as jwt from "jsonwebtoken";
import { User } from "src/entity/User";
import { baseConfig } from "../config/config";

export class CreateToken {
  public payload: object;
  public secretkey: string;
  public expires: object;
  constructor(dataEmail: string, dataId: number, dataRole: string) {
    this.payload = {
      id: dataId,
      email: dataEmail,
      role: dataRole,
    };
    this.secretkey = "abc45365";
    this.expires = {
      expiresIn: baseConfig.tokenExpire,
    };
  }
  public async token(): Promise<string> {
    const auth: string = jwt.sign(this.payload, this.secretkey, this.expires);
    return auth;
  }
}

export class Authorticator {
  public token: string;
  public secretkey: string;
  constructor(token: string) {
    this.token = token;
    this.secretkey = "abc45365";
  }
  public async responseInfoUser(): Promise<User> {
    const user: any = await (<any>jwt.verify(this.token, this.secretkey));
    return user;
  }
  public async verifyRole(): Promise<boolean> {
    const info = await this.responseInfoUser();
    const extention = ["ADMIN", "SUPPERADMIN"];
    const isReq = await extention.includes(info.role);
    return isReq;
  }
}

