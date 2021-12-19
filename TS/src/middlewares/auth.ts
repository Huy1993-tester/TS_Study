import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";

import { AuthedRequest, TokenPayload } from 'src/type/auth';
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
    return jwt.sign(this.payload, this.secretkey, this.expires);
  }
}

// export class Authorticator {
//   public token: string;
//   public secretkey: string;
//   constructor(token: string) {
//     this.token = token;
//     this.secretkey = "abc45365";
//   }
//   public async responseInfoUser(): Promise<User> {
//     const user: any = await (<any>jwt.verify(this.token, this.secretkey));
//     return user;
//   }
//   public async verifyRole(): Promise<boolean> {
//     const info = await this.responseInfoUser();
//     const extention = ["ADMIN", "SUPPERADMIN"];
//     const isReq = await extention.includes(info.role);
//     return isReq;
//   }
// }

export const authTokenMiddleware = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization');
  const secretkey = "abc45365";
  
  if (!token) {
    return next();
  }
  try {
    const auth = jwt.verify(token, secretkey, {maxAge: baseConfig.tokenExpire}) as TokenPayload;
    (req as AuthedRequest).auth = auth;
  } catch (e) {
    console.log('Auth error: ', e);
  }
  next();
};