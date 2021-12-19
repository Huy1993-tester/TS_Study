import { Request, Response } from "express";
import { Context } from 'apollo-server-core';

export interface TokenPayload {
    id: string,
    email: string,
    role: string,
}
export type AuthInfo = TokenPayload;

export interface AuthedRequest extends Request {
    auth: AuthInfo;
}

export interface ContextRequest extends Context {
  req: AuthedRequest;
}

export class AuthedContext {
  public constructor(public readonly req: AuthedRequest, public readonly res: Response) {}
}