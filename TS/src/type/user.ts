import { ArgsType, Field, InterfaceType } from "type-graphql";

@ArgsType()
export class CreateUserBody {
  @Field()
  public username: string;

  @Field()
  public password: string;

  @Field()
  public email: string;
  
  @Field()
  public role: string;
}

@ArgsType()
export class UpdateUserBody {
  @Field()
  public id: string;

  @Field()
  public username: string;

  @Field()
  public email: string;
}

@InterfaceType()
export class SignInResponse {
  @Field()
  public token: string;
}

@ArgsType()
export class CreateCommentBody {
  @Field()
  public comments: string;
  @Field()
  public userID: number;
}
