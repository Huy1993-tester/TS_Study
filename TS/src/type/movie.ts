import { Field, InterfaceType } from "type-graphql";

@InterfaceType()
export class MovieBody {
  @Field()
  public movieId: number;

  @Field()
  public rapId: number;
}

